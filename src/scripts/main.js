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

// init
// удаляем нативные элементы управления
video.controls = false;

if (video.muted) {
	// если есть атрибут muted у видео
	// кнопке звука задаем класс, чтобы сообщить пользователю о выключенном звуке
	// рейнджу звука устанавливаем 0
	buttonSound.classList.add('custom-video__sound-button--muted');
}

const handleLoadedMetaData = () => {
	// когда загнрузятся данные о видео
	// указываем рейнджу максимальное значение (обязательно атрибутом)
	// указываем пользователю длительноесть видео
	rangeTime.setAttribute("max", video.duration);
	timeAfter.innerText = msToTime(0);
	timeBefore.innerText = msToTime(video.duration * 1000);
}

video.addEventListener("loadedmetadata", handleLoadedMetaData);

// start
const handleButtonStart = () => {
	// если видна кнопка start, отслеживаем клик
	// удаляем слушатель этой кнопки
	// включаем звук и перематываем на начало видео
	buttonStart.removeEventListener('click', handleButtonStart);
	buttonStart.classList.add('hidden')
	toggleMutted();
}

// start & init
if (video.muted && video.autoplay) {
	// если автовоспроизведение включено и отключен звук
	// показываем кнопку старт
	// кнопке play/pause задаём класс custom-video__play-pause--played, указываем что видео играет
	// показывем что отключен звук у кнопки buttonSound
	buttonStart.classList.remove('hidden');
	toggleButtonPlayPause();
	buttonSound.classList.add('custom-video__sound-button--muted');
} else {
	// или просто удаляем слушатель этой кнопки
	buttonStart.removeEventListener('click', handleButtonStart);
}

buttonStart.addEventListener('click', handleButtonStart);

// play pause
const handleButtonPlayPause = () => {
	// по клику на кнопку play/pause
	if (video.paused || video.ended) {
		// если достигло конца, ставим на начало
		// включаем воспроизведение видео
		// задаём кнопке класс custom-video__play-pause--played
		if (video.duration - video.currentTime <= 10) {
			video.currentTime = 0;
		}
		video.play();
		toggleButtonPlayPause();
	} else {
		// ставим видео на паузу
		// меняем внешний вид кнопки play/Pause
		video.pause();
		buttonPlayPause.classList.remove('custom-video__play-pause--played');
	}
}

const toggleButtonPlayPause = () => {
	buttonPlayPause.classList.toggle('custom-video__play-pause--played');
}

buttonPlayPause.addEventListener('click', handleButtonPlayPause);

// time
const msToTime = (duration) => {
	// получаем время в миллисекундах, переводим в понятное время в формате чч:мм:сс
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds;
}

const handleTimeUpdate = () => {
	// когда видео воспроизводится
	// проверяем, наличие атрибута макс.
	// если нет, то добавляем этот атрибут и общую длительность видео
	// после чего обновляем текущее значение рейнджа и показываем пользователю текущее время
	if (!rangeTime.getAttribute("max")) {
		rangeTime.setAttribute("max", video.duration);
		timeBefore.innerText = msToTime(video.duration * 1000);
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
	// если пользователь меняет значение рейнджа
	// меняем время и у видео

	video.currentTime = +rangeTime.value;
}

rangeTime.addEventListener('input', handleRangeTime);

// sound
const toggleMutted = () => {
	// визуально переключаем внешний вид чтобы было видно когда звук отключен
	// если звук включается, то и рейнджу указываем уровень звука видео
	// добавить проверку после включения включения звука: если уровень громкости 0, то поставить 0.1
	buttonSound.classList.toggle('custom-video__sound-button--muted');
	video.muted = !video.muted;

	rangeSound.value = video.muted ? 0 : video.volume;
}

const handleButtonSound = () => {
	// по клику на кнопку выключения звкука,
	// визуально переключаем внешний вид чтобы было видно когда звук отключен
	// включаем/выключаем звук
	if (video.volume === 0) {
		return;
	}

	buttonSound.classList.toggle('custom-video__sound-button--muted');
	video.muted = !video.muted;
}

buttonSound.addEventListener('click', handleButtonSound);

const handleRangeSound = () => {
	// если пользователь меняет значение уровня громкости
	// меняем уровень громкости у видео
	// у кнопки включения/выключения звука, добавляем соответствующие классы для визуализации
	// при нулевой громкости указываем что у видео отключен звук
	video.volume = rangeSound.value;

	buttonSound.classList.toggle('custom-video__sound-button--down', +rangeSound.value <= 0.5);
	buttonSound.classList.toggle('custom-video__sound-button--muted', +rangeSound.value === 0);

	video.muted = !video.volume;
}

rangeSound.addEventListener('input', handleRangeSound);

// fullscreen
const setFullscreenData = (state) => {
	customVideo.setAttribute("data-fullscreen", !!state);
}

const handleFullscreen = () => {
	// по клику на кнопку фулскрин, смотрим
	// если есть полноэкранный режим, сворачиваем
	// или переводим наш блок в полноекранный режим
	// оба действия помечаем атрибутом
	if (document.fullscreenElement !== null) {
		document.exitFullscreen();
		setFullscreenData(false);
	} else {
		customVideo.requestFullscreen();
		setFullscreenData(true);

		// добавить проверку, если пользовать какое-то время не двигает мышкой - скрыть контроллер, при возобновлении движении мышки - опять показать
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

// custom-video__button-cc--current


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
