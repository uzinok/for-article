const rangeWrap = document.querySelector('.range-wrap');
rangeWrap.classList.remove('no-js');
const range = document.querySelector('.range');
const output = document.querySelector('.output-text');

const onRangeInput = () => {
	const value = range.value;
	output.innerText = value;

	const min = range.min;
	const max = range.max;
	const valuePercent = `${100 - ((max - value) / (max - min) * 100)}`;

	rangeWrap.style.setProperty('--valuePercent', valuePercent + '%');
};

onRangeInput();
range.addEventListener('input', onRangeInput);
