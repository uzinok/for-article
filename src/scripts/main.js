const rangeWrap = document.querySelector('.range-wrap');
const range = document.querySelector('.range');
const output = document.querySelector('.output');

rangeWrap.classList.remove('no-js');

const onRangeInput = () => {
	const value = range.value;
	const min = range.min;
	const max = range.max;

	const valuePercent = `${100 - ((max - value) / (max - min) * 100)}%`;

	range.style.backgroundSize = `${valuePercent} 100%`;
	output.value = value;
}

onRangeInput();
range.addEventListener('input', onRangeInput);



// const slider = document.querySelector('.slider');
// const range = document.querySelector('.slider__range-js');

range.addEventListener('input', () => {
	rangeWrap.style.setProperty('--value', range.value + '%');
});
