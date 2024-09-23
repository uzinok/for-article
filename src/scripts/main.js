const customSelect = document.querySelector('.custom-select');
const button = customSelect.querySelector('.custom-select__button');
const buttonText = button.querySelector('span');
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

const closeCustomSelect = () => {
	customSelect.classList.remove('custom-select--view');
}

const nextValue = () => {
	let target;

	if (!customSelect.querySelector('.custom-select__item--active')) {
		target = itemList[0];
	} else {
		itemList.forEach((item, index) => {
			if (!target) {
				target = item.classList.contains('custom-select__item--active') ? itemList[index + 1 >= itemList.length ? itemList.length - 1 : index + 1] : '';
			}
		});
	}

	const value = target.dataset.value;
	const text = target.innerText;

	updateInputValue(value);
	updateItemView(target);
	updateButtonText(text);
}

const prewValue = () => {
	let target;

	if (customSelect.querySelector('.custom-select__item--active')) {
		itemList.forEach((item, index) => {
			if (!target) {

				target = item.classList.contains('custom-select__item--active') ? itemList[index - 1 <= 0 ? 0 : index - 1] : '';
			}
		});

		const value = target.dataset.value;
		const text = target.innerText;

		updateInputValue(value);
		updateItemView(target);
		updateButtonText(text);
	}
}

const onkeydownCustomSelect = (evt) => {
	if (evt.key === 'ArrowUp' || evt.key === 'ArrowLeft') {
		console.log('up || left');

		evt.preventDefault();
		prewValue();
	}

	if (evt.key === 'ArrowDown' || evt.key === 'ArrowRight') {
		evt.preventDefault();
		nextValue();
	}

	if (evt.key === 'Escape') {
		closeCustomSelect();
	}
}

button.addEventListener('click', onClickButton);

list.addEventListener('click', onClickList);

customSelect.addEventListener('keydown', onkeydownCustomSelect)
