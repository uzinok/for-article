const customVideo = document.querySelector('.custom-video');
const video = customVideo.querySelector('.custom-video__elements');
const buttonStart = customVideo.querySelector('.custom-video__start');
const buttonPlayPause = customVideo.querySelector('.custom-video__play-pause');
const rangeTime = customVideo.querySelector('.custom-video__range-elements');
const timeBefore = customVideo.querySelector('.custom-video__range-before');
const timeAfter = customVideo.querySelector('.custom-video__range-after');
const fullscreen = customVideo.querySelector('.custom-video__fullscreen');
const buttonSound = customVideo.querySelector('.custom-video__sound-button');
const rangeSound = customVideo.querySelector('.custom-video__sound-range');
const soundDownload = customVideo.querySelector('.custom-video__download');
const buttonCC = customVideo.querySelector('.custom-video__button-cc');
const labelSpeed = customVideo.querySelector('.custom-video__speed-label span');
const rangeSpeed = customVideo.querySelector('.custom-video__speed-range');
const buttonSettings = customVideo.querySelector('.custom-video__settings');

video.controls = false;

if (video.muted) {
	buttonSound.classList.add('custom-video__sound-button--muted');
}

const setDuration = () => {
	rangeTime.setAttribute("max", video.duration);
	timeAfter.innerText = msToTime(0);
	timeBefore.innerText = msToTime(video.duration * 1000);
}

const handleLoadedMetaData = () => {
	setDuration();
}
video.addEventListener("loadedmetadata", handleLoadedMetaData);

// start
const handleButtonStart = () => {
	buttonStart.removeEventListener('click', handleButtonStart);
	buttonStart.classList.add('hidden');
	toggleMutted();
}

const toggleButtonPlayPause = () => {
	buttonPlayPause.classList.toggle('custom-video__play-pause--played');
}

if (video.muted && video.autoplay && buttonStart) {
	buttonStart.classList.remove('hidden');
	buttonStart.addEventListener('click', handleButtonStart);
	toggleButtonPlayPause();
	buttonSound.classList.add('custom-video__sound-button--muted');
}

const handleButtonPlayPause = () => {
	if (video.paused || video.ended) {
		if (video.duration - video.currentTime <= 10) {
			video.currentTime = 0;
		}
		video.play();
		toggleButtonPlayPause();
	} else {
		video.pause();
		buttonPlayPause.classList.remove('custom-video__play-pause--played');
	}
}
buttonPlayPause.addEventListener('click', handleButtonPlayPause);

// time
const msToTime = (duration) => {
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds;
}

const handleTimeUpdate = () => {
	if (!rangeTime.getAttribute("max")) {
		setDuration();
	}

	rangeTime.value = video.currentTime;
	timeAfter.innerText = msToTime(video.currentTime * 1000);
}
video.addEventListener("timeupdate", handleTimeUpdate);

const handleEnded = () => {
	buttonPlayPause.classList.remove('custom-video__play-pause--played');
}
video.addEventListener('ended', handleEnded);

const handleRangeTime = () => {
	video.currentTime = +rangeTime.value;
}
rangeTime.addEventListener('input', handleRangeTime);

// sound
const toggleMutted = () => {
	buttonSound.classList.toggle('custom-video__sound-button--muted');
	video.muted = !video.muted;
}

const handleButtonSound = () => {
	if (video.volume === 0) {
		return;
	}

	toggleMutted();
}
buttonSound.addEventListener('click', handleButtonSound);

const handleRangeSound = () => {
	video.volume = rangeSound.value;
	buttonSound.classList.toggle('custom-video__sound-button--down', +rangeSound.value <= 0.5);
	buttonSound.classList.toggle('custom-video__sound-button--muted', +rangeSound.value === 0);
	video.muted = !video.volume;
}
rangeSound.addEventListener('input', handleRangeSound);

// fullscreen
const toggleFullscreenClass = () => {
	customVideo.classList.toggle('custom-video--fullscreen');
}

const handleFullscreenchange = () => {
	if (document.fullscreenElement === null) {
		document.exitFullscreen();
		toggleFullscreenClass(false);
	}
}

const handleFullscreen = () => {
	if (document.fullscreenElement === null) {
		customVideo.addEventListener('fullscreenchange', handleFullscreenchange);
		toggleFullscreenClass();
		customVideo.requestFullscreen();
	} else {
		customVideo.removeEventListener('fullscreenchange', handleFullscreenchange);
		toggleFullscreenClass();
		document.exitFullscreen();
	}
};
fullscreen.addEventListener('click', handleFullscreen);

// speed
const handleRangeSpeed = () => {
	video.playbackRate = +rangeSpeed.value;
	labelSpeed.innerText = +rangeSpeed.value;
}
rangeSpeed.addEventListener('input', handleRangeSpeed);

// track
// subtitles

const toggleButtonCCClassHidden = (state) => {
	buttonCC.classList.toggle('custom-video__button-cc--current', !state)
}

if (video.textTracks.length === 0) {
	buttonCC.classList.add('hidden');
} else {
	for (var i = 0; i < video.textTracks.length; i++) {
		video.textTracks[i].mode = "hidden";
	}
	toggleButtonCCClassHidden(true);
}

const handleButtonCC = () => {
	if (video.textTracks[0].mode === 'hidden') {
		video.textTracks[0].mode = 'showing';
		toggleButtonCCClassHidden(false);
	} else {
		toggleButtonCCClassHidden(true);
		video.textTracks[0].mode = 'hidden';
	}
}

if (video.textTracks.length === 1) {
	buttonCC.addEventListener('click', handleButtonCC);
}

const createButtonCC = (label, dataTrack) => {
	const button = document.createElement('button');
	button.type = 'button';
	button.innerText = label;
	button.classList.add('custom-video__button-settings');
	button.classList.add('custom-video__button-cc');
	button.dataset.track = dataTrack;

	return button;
}

const toggleButtonCCClassCurrent = (AllButtonListCC, current) => {
	AllButtonListCC.forEach(button => {
		button.classList.toggle('custom-video__button-cc--current', +button.dataset.track === +current);
	});
}

if (video.textTracks.length > 1) {
	buttonCC.classList.add('hidden');
	const AllButtonListCC = [];
	const listCC = document.createElement('ul');
	listCC.classList.add('custom-video__list-cc');

	const li = document.createElement('li');

	const buttonHiddenCC = createButtonCC('Отключить', -1);

	AllButtonListCC.push(buttonHiddenCC);
	toggleButtonCCClassCurrent(AllButtonListCC, -1);

	li.append(buttonHiddenCC);
	listCC.append(li);

	for (let i = 0; i < video.textTracks.length; i++) {
		const element = video.textTracks[i];

		const li = document.createElement('li');

		const button = createButtonCC(element.label, i);

		AllButtonListCC.push(button);

		li.append(button);
		listCC.append(li);
	}

	buttonCC.after(listCC);

	listCC.addEventListener('click', (evt) => {
		if (!evt.target.dataset.track) {
			return;
		}

		for (var i = 0; i < video.textTracks.length; i++) {
			video.textTracks[i].mode = "hidden";
		}

		toggleButtonCCClassCurrent(AllButtonListCC, evt.target.dataset.track);

		if (+evt.target.dataset.track === -1) {
			return toggleButtonCCClassHidden(true);
		}

		video.textTracks[+evt.target.dataset.track].mode = 'showing';
		toggleButtonCCClassHidden(false);
	});
}

const checkSettingsClick = (evt) => {
	if (!evt.target.closest('.custom-video__settings') && !evt.target.closest('.custom-video__list-settings')) {
		closeSetting();
	}
}

const openSetting = () => {
	buttonSettings.classList.add('custom-video__settings--opened');
	document.addEventListener('click', checkSettingsClick);
}

const closeSetting = () => {
	buttonSettings.classList.remove('custom-video__settings--opened');
	document.removeEventListener('click', checkSettingsClick);
}

const handleButtonSettings = () => {
	if (buttonSettings.classList.contains('custom-video__settings--opened')) {
		return closeSetting();
	}

	openSetting();
}

buttonSettings.addEventListener('click', handleButtonSettings);
