const customVideo = document.querySelector('.custom-video');
const video = customVideo.querySelector('.custom-video__elements');
const start = customVideo.querySelector('.custom-video__start');
const playPause = customVideo.querySelector('.custom-video__play-pause');
const range = customVideo.querySelector('.custom-video__range-elements');
const timeBefore = customVideo.querySelector('.custom-video__range-before');
const timeAfter = customVideo.querySelector('.custom-video__range-after');

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
	range.setAttribute("max", video.duration);
	timeBefore.innerText = getTime(video.duration);
});

video.addEventListener("timeupdate", () => {
	range.value = video.currentTime;
	timeAfter.innerText = getTime(video.currentTime);
});

range.addEventListener('input', () => {
	video.currentTime = range.value;
});
