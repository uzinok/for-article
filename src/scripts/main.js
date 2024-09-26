const textCircle = document.querySelector('.text-circle');
const newTextArray = [];

textCircle.innerText.split('').forEach((element, i) => {
	newTextArray.push(`<span class="char-${i}">${element}</span>`);
});

textCircle.innerHTML = newTextArray.join('');
