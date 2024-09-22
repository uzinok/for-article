const customSelect = document.querySelector('.custom-select');
const button = customSelect.querySelector('.custom-select__button');
const list = customSelect.querySelector('.custom-select__list');
const input = customSelect.querySelector('.custom-select__input');
const itemList = customSelect.querySelectorAll('.custom-select__item');

const onClickButton = () => {
	customSelect.classList.toggle('custom-select--view');
}

const updateInputValue = (value) => {
	input.value = value;
}

const updateItemView = (elem) => {
	itemList.forEach((item) => {
		item.classList.toggle('custom-select__item--active', item.dataset.value === elem.dataset.value);
	});
}

const updateButtonText = (text) => {
	button.innerText = text;
}

const onListClick = (evt) => {
	if (evt.target.dataset.value) {
		const target = evt.target;
		const value = evt.target.dataset.value;
		const text = evt.target.innerText;

		updateInputValue(value);
		updateItemView(target);
		updateButtonText(text);
	}
}

button.addEventListener('click', onClickButton);

list.addEventListener('click', onListClick);
