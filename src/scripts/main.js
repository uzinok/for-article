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

video.controls = false;

if (video.muted && video.autoplay) {
	// если автовоспроизведение включено и отключен звук
	// показываем кнопку старт
	// кнопке play/pause задаём класс custom-video__play-pause--played
	// указываем что видео играет
	buttonStart.style.display = 'block';
	playPause.classList.add('custom-video__play-pause--played');
} else {
	buttonStart.remove();
}

buttonStart.addEventListener('click', () => {
	// если видна кнопка start, отслеживаем клик
	// удаляем кнопку, чтобы не мешалась и чтобы удалить лишние слушатели
	// включаем звук и перематываем на начало видео
	buttonStart.remove();
	video.muted = false;
	video.currentTime = 0;
});

playPause.addEventListener("click", (e) => {
	// по клику на кнопку play/pause
	if (video.paused || video.ended) {
		// если видео на паузе или достигло конца
		// включаем воспроизведение видео
		// задаём кноке класс custom-video__play-pause--played
		video.play();
		playPause.classList.add('custom-video__play-pause--played');
	} else {
		video.pause();
		playPause.classList.remove('custom-video__play-pause--played');
	}
});
