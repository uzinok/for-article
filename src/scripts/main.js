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
	timeBefore.innerText = msToTime(video.duration * 1000);
});

video.addEventListener("timeupdate", () => {
	range.value = video.currentTime;
	timeAfter.innerText = msToTime(video.currentTime * 1000);
});

range.addEventListener('input', () => {
	video.currentTime = range.value;
});

function msToTime(duration) {
	var seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return hours + ":" + minutes + ":" + seconds;
}
console.log(msToTime(300000))
