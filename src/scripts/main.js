const customSelect = document.querySelector('.custom-select');
const button = customSelect.querySelector('.custom-select__button');
const buttonText = button.querySelector('span');
const list = customSelect.querySelector('.custom-select__list');
const selectNative = customSelect.querySelector('.custom-select__native');
const itemList = customSelect.querySelectorAll('.custom-select__item');

const onClickButton = () => {
	if (customSelect.classList.contains('custom-select--view')) {
		closeCustomSelect();
		return;
	}
	openCustomSelect();
}

const updateValue = (value) => {
	selectNative.value = value;
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

		updateValue(value);
		updateItemView(target);
		updateButtonText(text);
		closeCustomSelect();
	}
}

const onClickDocument = (evt) => {
	if (!evt.target.closest('button')) {
		closeCustomSelect();
	}
}

const openCustomSelect = () => {
	console.log('open');

	customSelect.classList.add('custom-select--view');

	list.addEventListener('click', onClickList);
	document.addEventListener('click', onClickDocument);
}

const closeCustomSelect = () => {
	customSelect.classList.remove('custom-select--view');

	list.removeEventListener('click', onClickList);
	document.removeEventListener('click', onClickDocument);
}

button.addEventListener('click', onClickButton);

const onChangeSelectNative = (evt) => {
	const target = customSelect.querySelector(`[data-value="${evt.target.value}"]`);
	const value = target.dataset.value;
	const text = target.innerText;

	updateValue(value);
	updateItemView(target);
	updateButtonText(text);
}

selectNative.addEventListener('change', onChangeSelectNative);
