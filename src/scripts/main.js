const textarea = document.querySelector('textarea');

const text = 'Для того чтобы сделать TextArea autoGrow или, проще говоря, резиновый TextArea, достаточно отследить изменение в поле ввода и измерить высоту элемента с помощью JavaScript-свойства элемента scrollHeight. \nСбросте высоту элемента перед назначением новой высоты, на случай если количество текста уменьшится. \nДля более точного определения высоты стоит учитывать высоту бордера сверху и снизу.'

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
	}
}


setTimeout(addCharacter, 6000);

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
