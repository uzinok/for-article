const customVideo = document.querySelector('.custom-video');
const video = customVideo.querySelector('.custom-video__elements');
const buttonStart = customVideo.querySelector('.custom-video__start');
const playPause = customVideo.querySelector('.custom-video__play-pause');
const timeRange = customVideo.querySelector('.custom-video__range-elements');
const timeBefore = customVideo.querySelector('.custom-video__range-before');
const timeAfter = customVideo.querySelector('.custom-video__range-after');
const fullscreen = customVideo.querySelector('.custom-video__fullscreen');
const soundButton = customVideo.querySelector('.custom-video__sound-button');
const soundRange = customVideo.querySelector('.custom-video__sound-range');

// добавить проверку: видео закончилось addEventListener ended
// если по каким то причинам отсталось примерно 10ms то по клику плей - начать воспроизведение с начала
// продумать изменение уровня звука на мобилке.

// удаляем нативные элементы управления
video.controls = false;

if (video.muted && video.autoplay) {
	// если автовоспроизведение включено и отключен звук
	// показываем кнопку старт
	// кнопке play/pause задаём класс custom-video__play-pause--played
	// указываем что видео играет
	buttonStart.style.display = 'block';
	playPause.classList.add('custom-video__play-pause--played');
} else {
	// кнопку можно и не удалять, но слушатель этой кнопки, который ниже, необходимо удалить
	buttonStart.remove();
}

buttonStart.addEventListener('click', () => {
	// если видна кнопка start, отслеживаем клик
	// удаляем кнопку, чтобы не мешалась и чтобы удалить лишние слушатели
	// включаем звук и перематываем на начало видео
	buttonStart.remove();
	video.muted = false;
});

playPause.addEventListener("click", (e) => {
	// по клику на кнопку play/pause
	if (video.paused || video.ended) {
		// если видео на паузе или достигло конца
		// включаем воспроизведение видео
		// задаём кноке класс custom-video__play-pause--played
		if (video.duration - video.currentTime <= 10) {
			video.currentTime = 0;
		}
		video.play();
		playPause.classList.add('custom-video__play-pause--played');

	} else {
		video.pause();
		playPause.classList.remove('custom-video__play-pause--played');
	}
});

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

video.addEventListener("loadedmetadata", () => {
	// когда загнрузятся данные о видео
	// указываем рейнджу максимальное значение
	// указываем пользователю длительноесть видео
	timeRange.setAttribute("max", video.duration);
	timeAfter.innerText = msToTime(0);
	timeBefore.innerText = msToTime(video.duration * 1000);
});

video.addEventListener("timeupdate", () => {
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
});

timeRange.addEventListener('input', () => {
	// если пользователь меняет значение рейнджа
	// меняем время и у видео

	video.currentTime = +timeRange.value;
});

video.addEventListener('ended', () => {
	playPause.classList.remove('custom-video__play-pause--played');
});

if (video.muted) {
	// если есть атрибут muted у видео
	// кнопке звука задаем класс, чтобы сообщить пользователю о выключенном звуке
	// рейнджу звука устанавливаем 0
	soundButton.classList.add('custom-video__sound-button--muted');
	soundRange.value = 0;
}

soundButton.addEventListener('click', () => {
	// по клику на кнопку выключения звкука,
	// визуально переключаем внешний вид чтобы было видно когда звук отключен
	// если звук включается, то и рейнджу указываем уровень звука видео
	// добавить проверку после включения включения звука: если уровень громкости 0, то поставить 0.1
	soundButton.classList.toggle('custom-video__sound-button--muted');
	video.muted = !video.muted;

	soundRange.value = video.muted ? 0 : video.volume;
});

soundRange.addEventListener('input', () => {
	// если пользователь меняет значение уровня громкости
	// меняем уровень громкости у видео
	// у кнопки включения/выключения звука, добавляем соответствующие классы для визуализации
	video.volume = soundRange.value;

	soundButton.classList.toggle('custom-video__sound-button--down', +soundRange.value <= 0.5);
	soundButton.classList.toggle('custom-video__sound-button--muted', +soundRange.value === 0);
});

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
