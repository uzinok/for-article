const textarea = document.querySelector('textarea');

const text = 'Для того чтобы сделать TextArea autoGrow или, проще говоря, резиновый TextArea, достаточно отследить изменение в поле ввода и измерить его высоту с помощью JavaScript-свойства элемента scrollHeight.   \nСбросте высоту элемента перед назначением новой высоты, на случай если количество текста уменьшится.   \nДля более точного определения высоты стоит учитывать высоту бордера сверху и снизу.'

const onInputTextarea = () => {
	textarea.style.height = ``
	textarea.style.height = `${textarea.scrollHeight + 2}px`
}

let index = 0;

function addCharacter() {
	if (index < text.length) {
		textarea.value += text[index];
		index++;
		onInputTextarea();
		setTimeout(addCharacter, 50); // Устанавливает скорость: 100 мс на символ

		if (textarea.value.indexOf('достаточно') > 0) {
			document.querySelector('.span-1').classList.add('active');
		}
		if (textarea.value.indexOf('отследить') > 0) {
			document.querySelector('.span-2').classList.add('active');
		}
		if (textarea.value.indexOf('изменение') > 0) {
			document.querySelector('.span-3').classList.add('active');
			document.querySelector('.span-4').classList.add('active');
		}
		if (textarea.value.indexOf('изменение') > 0) {
			document.querySelector('.span-3').classList.add('active');
			document.querySelector('.span-4').classList.add('active');
		}
		if (textarea.value.indexOf('ввода и') > 0) {
			document.querySelector('.span-5').classList.add('active');
		}
		if (textarea.value.indexOf('-свойства элемента') > 0) {
			document.querySelector('.span-6').classList.add('active');
		}
		if (textarea.value.indexOf('scrollHeight.') > 0) {
			document.querySelector('.span-7').classList.add('active');
		}
		if (textarea.value.indexOf('учитывать высоту') > 0) {
			document.querySelector('.span-8').classList.add('active');
		}
		//
	}
}


setTimeout(addCharacter, 10);

textarea.addEventListener('input', onInputTextarea);






// const textArea = document.getElementById('myTextarea');
// const text = "Для того, чтобы сделать TextArea autoGrow или проще говоря резиновый TextArea, Достаточно отследить изменение в поле ввода и измерить высоту элемента с помощью JavaScript свойства элемента scrollHeight.";
// let index = 0;

// function addCharacter() {
// 	if (index < text.length) {
// 		textArea.value += text[index];
// 		index++;
// 		resizeTextArea();
// 		setTimeout(addCharacter, 100); // Устанавливает скорость: 100 мс на символ
// 	}
// }

// function resizeTextArea() {
// 	// Установим высоту в 1px для правильного измерения scrollHeight
// 	textArea.style.height = '1px';
// 	textArea.style.height = (textArea.scrollHeight) + 'px';
// }

// textArea.addEventListener('input', resizeTextArea);
// addCharacter();
