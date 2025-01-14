// const input = document.querySelector('.password-input');
// const button = document.querySelector('.password-button');
// const buttonText = document.querySelector('.password-button__text');

// const togglePassword = () => {
// 	if (button.classList.contains('password-button--view')) {
// 		input.type = 'password';
// 		button.classList.remove('password-button--view');
// 		buttonText.innerText = 'Показать';
// 	} else {
// 		input.type = 'text';
// 		button.classList.add('password-button--view');
// 		buttonText.innerText = 'Скрыть';
// 	}

// 	input.focus();
// }

// button.addEventListener('click', togglePassword);

const input = document.querySelector('.password-input');
const button = document.querySelector('.password-button');
const buttonText = document.querySelector('.password-button__text');

const togglePassword = () => {
	const isViewMode = button.classList.toggle('password-button--view');
	input.type = isViewMode ? 'text' : 'password';
	buttonText.textContent = isViewMode ? 'Скрыть' : 'Показать';
	input.focus();
}

button.addEventListener('click', togglePassword);
