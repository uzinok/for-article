const customSelect = document.querySelector('.custom-select');
const button = customSelect.querySelector('.custom-select__button');
const buttonText = button.querySelector('span');
const list = customSelect.querySelector('.custom-select__list');
const input = customSelect.querySelector('.custom-select__input');
const itemList = customSelect.querySelectorAll('.custom-select__item');

const onClickButton = () => {
	if (customSelect.classList.contains('custom-select--view')) {
		closeCustomSelect();
		return;
	}

	openCustomSelect();
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
	buttonText.innerText = text;
}

const onClickList = (evt) => {
	if (evt.target.dataset.value) {
		const target = evt.target;
		const value = target.dataset.value;
		const text = target.innerText;

		updateInputValue(value);
		updateItemView(target);
		updateButtonText(text);
		closeCustomSelect();
	}
}

const openCustomSelect = () => {
	customSelect.classList.add('custom-select--view');

	list.addEventListener('click', onClickList);
}

const closeCustomSelect = () => {
	customSelect.classList.remove('custom-select--view');

	list.removeEventListener('click', onClickList);
}

button.addEventListener('click', onClickButton);
