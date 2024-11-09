const rangeWrap = document.querySelector('.range-wrap'); // получаем родительский блок output

rangeWrap.classList.remove('no-js'); // удаляем класс no-js

const range = document.querySelector('.range');
const output = document.querySelector('.output');

const onRangeInput = () => {
	const value = range.value;

	output.value = value;

	const min = range.min; // минимальое значение
	const max = range.max; // максимальное значение
	const valuePercent = `${100 - ((max - value) / (max - min) * 100)}%`; // расчитываем проценты

	range.style.backgroundSize = `${ valuePercent } 100%`; // меняемм значение background-size
}

onRangeInput();
range.addEventListener('input', onRangeInput);
