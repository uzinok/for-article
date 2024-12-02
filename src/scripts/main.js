const customVideo = document.querySelector('.custom-video');
const video = customVideo.querySelector('.custom-video__elements');
const buttonStart = customVideo.querySelector('.custom-video__start');
const buttonPlayPause = customVideo.querySelector('.custom-video__play-pause');
const timeRange = customVideo.querySelector('.custom-video__range-elements');
const timeBefore = customVideo.querySelector('.custom-video__range-before');
const timeAfter = customVideo.querySelector('.custom-video__range-after');
const fullscreen = customVideo.querySelector('.custom-video__fullscreen');
const buttonSound = customVideo.querySelector('.custom-video__sound-button');
const soundRange = customVideo.querySelector('.custom-video__sound-range');
const buttonCC = customVideo.querySelector('.custom-video__cc');

// удаляем нативные элементы управления
video.controls = false;

// all
const toggleMutted = () => {
	// визуально переключаем внешний вид чтобы было видно когда звук отключен
	// если звук включается, то и рейнджу указываем уровень звука видео
	// добавить проверку после включения включения звука: если уровень громкости 0, то поставить 0.1
	buttonSound.classList.toggle('custom-video__sound-button--muted');
	video.muted = !video.muted;

	soundRange.value = video.muted ? 0 : video.volume;
}

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

const toggleButtonPlayPause = () => {
	buttonPlayPause.classList.toggle('custom-video__play-pause--played');
}

const setFullscreenData = (state) => {
	customVideo.setAttribute("data-fullscreen", !!state);
}

// handle
const handleButtonStart = () => {
	// если видна кнопка start, отслеживаем клик
	// удаляем слушатель этой кнопки
	// включаем звук и перематываем на начало видео
	buttonStart.removeEventListener('click', handleButtonStart);
	buttonStart.classList.add('hide')
	toggleMutted();
}

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

const handleLoadedMetaData = () => {
	// когда загнрузятся данные о видео
	// указываем рейнджу максимальное значение (обязательно атрибутом)
	// указываем пользователю длительноесть видео
	timeRange.setAttribute("max", video.duration);
	timeAfter.innerText = msToTime(0);
	timeBefore.innerText = msToTime(video.duration * 1000);
}

const handleTimeUpdate = () => {
	// когда видео воспроизводится
	// проверяем, наличие атрибута макс.
	// если нет, то добавляем этот атрибут и общую длительность видео
	// после чего обновляем текущее значение рейнджа и показываем пользователю текущее время
	if (!timeRange.getAttribute("max")) {
		timeRange.setAttribute("max", video.duration);
		timeBefore.innerText = msToTime(video.duration * 1000);
	}

	timeRange.value = video.currentTime;
	timeAfter.innerText = msToTime(video.currentTime * 1000);
}

const handleEnded = () => {
	buttonPlayPause.classList.remove('custom-video__play-pause--played');
}

const handleTimeRange = () => {
	// если пользователь меняет значение рейнджа
	// меняем время и у видео

	video.currentTime = +timeRange.value;
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

const handleSoundRange = () => {
	// если пользователь меняет значение уровня громкости
	// меняем уровень громкости у видео
	// у кнопки включения/выключения звука, добавляем соответствующие классы для визуализации
	// при нулевой громкости указываем что у видео отключен звук
	video.volume = soundRange.value;

	buttonSound.classList.toggle('custom-video__sound-button--down', +soundRange.value <= 0.5);
	buttonSound.classList.toggle('custom-video__sound-button--muted', +soundRange.value === 0);

	video.muted = !video.volume;
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

// init
if (video.muted && video.autoplay) {
	// если автовоспроизведение включено и отключен звук
	// показываем кнопку старт
	// кнопке play/pause задаём класс custom-video__play-pause--played, указываем что видео играет
	// показывем что отключен звук у кнопки buttonSound
	buttonStart.classList.remove('hide');
	toggleButtonPlayPause();
	buttonSound.classList.add('custom-video__sound-button--muted');
} else {
	// или просто удаляем слушатель этой кнопки
	buttonStart.removeEventListener('click', handleButtonStart);
}

if (video.muted) {
	// если есть атрибут muted у видео
	// кнопке звука задаем класс, чтобы сообщить пользователю о выключенном звуке
	// рейнджу звука устанавливаем 0
	buttonSound.classList.add('custom-video__sound-button--muted');
	soundRange.value = 0;
}

video.addEventListener("loadedmetadata", handleLoadedMetaData);

// work
buttonStart.addEventListener('click', handleButtonStart);

buttonPlayPause.addEventListener('click', handleButtonPlayPause);

video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener('ended', handleEnded);
timeRange.addEventListener('input', handleTimeRange);

buttonSound.addEventListener('click', handleButtonSound);
soundRange.addEventListener('input', handleSoundRange);

fullscreen.addEventListener('click', handleFullscreen);

// track
// subtitles
if (video.textTracks.length === 0) {
	buttonCC.classList.add('hide');
} else {
	for (var i = 0; i < video.textTracks.length; i++) {
		video.textTracks[i].mode = "hidden";
	}
	buttonCC.classList.add('custom-video__cc--hidden');
}

if (video.textTracks.length === 1) {
	const handleButtonCC = () => {
		if (video.textTracks[0].mode === 'hidden') {
			video.textTracks[0].mode = 'showing';
			buttonCC.classList.remove('custom-video__cc--hidden');
		} else {
			buttonCC.classList.add('custom-video__cc--hidden');
			video.textTracks[0].mode = 'hidden';
		}
	}

	buttonCC.addEventListener('click', handleButtonCC);
}

if (video.textTracks.length > 1) {
	const listCC = document.createElement('ul');
	listCC.classList.add('custom-video__list-cc');

	const li = document.createElement('li');

	const buttonHiddenCC = document.createElement('button');
	buttonHiddenCC.type = 'button';
	buttonHiddenCC.innerText = 'Отключить';
	buttonHiddenCC.classList.add('custom-video__button-cc');
	buttonHiddenCC.dataset.track = -1;

	li.append(buttonHiddenCC);
	listCC.append(li);

	for (let i = 0; i < video.textTracks.length; i++) {
		const element = video.textTracks[i];

		const li = document.createElement('li');

		const button = document.createElement('button');
		button.innerText = element.label;
		button.classList.add('custom-video__button-cc');
		button.dataset.track = i;

		li.append(button);
		listCC.append(li);
	}

	buttonCC.after(listCC);

	listCC.addEventListener('click', (evt) => {
		for (var i = 0; i < video.textTracks.length; i++) {
			video.textTracks[i].mode = "hidden";
		}

		if (+evt.target.dataset.track === -1) {
			return buttonCC.classList.add('custom-video__cc--hidden');
		}

		video.textTracks[+evt.target.dataset.track].mode = 'showing';
		buttonCC.classList.remove('custom-video__cc--hidden');

	});
}
