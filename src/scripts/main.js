const rangeWrap = document.querySelector('.range-wrap'); // получаем родительский блок output

rangeWrap.classList.remove('no-js'); // удаляем класс no-js

const range = document.querySelector('.range');
const output = document.querySelector('.output');

const onRangeInput = () => {
	const value = range.value;
	output.value = value;
}
onRangeInput();
range.addEventListener('input', onRangeInput);
