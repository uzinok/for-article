window.addEventListener('load', function() {

	setHeightTitleCard();
	window.addEventListener('resize', setHeightTitleCard);

	function setHeightTitleCard() {
		// массив заголовков
		let titles = Array.from(document.querySelectorAll('.card__title'));

		// обнуляю высоту
		titles.map(title => {
			title.style.height = ''
		});

		// размер подмассива
		let lenght = +getComputedStyle(document.body).getPropertyValue("--card-length");

		// создаю массив строк
		// массив в который будет выведен результат.
		let title = [];
		for (let i = 0; i < Math.ceil(titles.length / lenght); i++) {
			title[i] = titles.slice((i * lenght), (i * lenght) + lenght);
		}

		// добавление высоты
		title.map(items => {
			// получение
			const h = Math.max.apply(null, items.map(item => item.scrollHeight));
			// добавленеи
			items.map(item => item.style.height = h + 'px');
		});
	}
});
