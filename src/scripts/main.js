const container = document.querySelector('.textarea-container');
const textareaVisible = container.querySelector('.textarea-visible');

const textareaHidde = document.createElement('div');
textareaHidde.classList.add('textarea-hidde');
container.append(textareaHidde);

const onInputTextarea = () => {
	textareaHidde.innerText = textareaVisible.value;

	if (textareaVisible.value) {
		console.log(textareaHidde.offsetHeight + 'px');

		textareaVisible.style.height = textareaHidde.offsetHeight + 'px';
	}
}

textareaVisible.addEventListener('input', onInputTextarea);

console.log(container);
console.log(textareaVisible);
