const textCircle = document.querySelector('.text-circle');
const newTextArray = [];

textCircle.setAttribute('style', `--total: ${textCircle.innerText.length};`);

textCircle.innerText.split('').forEach((element, i) => {
	newTextArray.push(`<span style="--index: ${i}">${element}</span>`);
});

textCircle.innerHTML = newTextArray.join('');
