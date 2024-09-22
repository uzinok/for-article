const customSelect = document.querySelector('.custom-select');
const button = document.querySelector('.custom-select__button');

const onClickButton = () => {
	customSelect.classList.toggle('custom-select--view');
}

button.addEventListener('click', onClickButton);

console.log(customSelect);
