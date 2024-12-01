const customVideo = document.querySelector('.custom-video');
const video = customVideo.querySelector('.custom-video__elements');
const start = customVideo.querySelector('.custom-video__start');
const playPause = customVideo.querySelector('.custom-video__play-pause');
const timeRange = customVideo.querySelector('.custom-video__range-elements');
const timeBefore = customVideo.querySelector('.custom-video__range-before');
const timeAfter = customVideo.querySelector('.custom-video__range-after');
const fullscreen = customVideo.querySelector('.custom-video__fullscreen');
const soundButton = customVideo.querySelector('.custom-video__sound-button');
const soundRange = customVideo.querySelector('.custom-video__sound-range');

video.controls = false;
timeRange.setAttribute('value', 0);

start.addEventListener('click', () => {
	video.play();
	customVideo.classList.add('custom-video--started');
	playPause.classList.add('custom-video__play-pause--played')
});

playPause.addEventListener("click", (e) => {
	if (video.paused || video.ended) {
		video.play();
		playPause.classList.add('custom-video__play-pause--played')
	} else {
		video.pause();
		playPause.classList.remove('custom-video__play-pause--played')
	}
});

const roundUp = (num, precision) => {
	precision = Math.pow(10, precision)
	return Math.ceil(num * precision) / precision
}

const getTime = (time) => roundUp(time / 60, 2);

video.addEventListener("loadedmetadata", () => {
	timeRange.setAttribute("max", video.duration);
	timeAfter.innerText = msToTime(0);
	timeBefore.innerText = msToTime(video.duration * 1000);
});

video.addEventListener("timeupdate", () => {
	if (!timeRange.getAttribute("max")) {
		timeRange.setAttribute("max", video.duration);
	}

	timeRange.value = video.currentTime;
	timeAfter.innerText = msToTime(video.currentTime * 1000);
});

timeRange.addEventListener('input', () => {
	video.currentTime = +timeRange.value;
});

function msToTime(duration) {
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds;
}

const setFullscreenData = (state) => {
	customVideo.setAttribute("data-fullscreen", !!state);
}

const handleFullscreen = () => {
	if (document.fullscreenElement !== null) {
		// The document is in fullscreen mode
		document.exitFullscreen();
		setFullscreenData(false);
	} else {
		// The document is not in fullscreen mode
		customVideo.requestFullscreen();
		setFullscreenData(true);
	}
};

fullscreen.addEventListener('click', handleFullscreen);

if (video.muted) {
	soundButton.classList.add('custom-video__sound-button--muted');
	soundRange.value = 0;
} else {
	soundRange.value = video.volume;
}

soundButton.addEventListener('click', () => {
	soundButton.classList.toggle('custom-video__sound-button--muted');
	video.muted = !video.muted;

	soundRange.value = video.muted ? 0 : video.volume;
});

soundRange.addEventListener('input', () => {
	video.volume = soundRange.value;

	soundButton.classList.toggle('custom-video__sound-button--down', +soundRange.value <= 0.5);
	soundButton.classList.toggle('custom-video__sound-button--muted', +soundRange.value === 0);
});
