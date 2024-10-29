const slider = document.querySelector('.slider');
const range = document.querySelector('.slider__range-js');

range.addEventListener('input', () => {
	console.log(range.value);

	slider.style.setProperty('--value', range.value + '%');
});
