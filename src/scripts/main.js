document.addEventListener("DOMContentLoaded", () => {

	// Находим все элементы с классом "next-text"
	const textBlocks = document.querySelectorAll('.next-text');

	// Перебираем каждый блок
	textBlocks.forEach(block => {
		// Разбиваем текст на слова
		const words = block.textContent.split(' ');

		// Очищаем содержимое блока
		block.innerHTML = '';

		// Оборачиваем каждое слово в <span> и добавляем обратно в блок
		words.forEach(word => {
			const span = document.createElement('span');
			span.textContent = word + ' '; // Добавляем пробел после каждого слова
			block.appendChild(span);
		});
	});

	const divs = document.querySelectorAll('.next-text');
	let spanIndex = 0;
	let divIndex = 0;
	let intervalId;

	const startSwitching = () => {
		intervalId = setInterval(() => {
			if (divIndex >= divs.length) {
				clearInterval(intervalId);
				// Удаляем класс актив у последнего <div> после 500ms
				setTimeout(() => {
					const lastDiv = divs[divs.length - 1];
					if (lastDiv) {
						lastDiv.classList.remove('active');
					}
				}, 500);
				return;
			}

			// Удаляем класс current у предыдущего <span>
			const currentSpan = document.querySelector('.current');
			if (currentSpan) {
				currentSpan.classList.remove('current');
			}

			// Удаляем класс active у предыдущего <div>
			const currentActiveDiv = document.querySelector('.active');
			if (currentActiveDiv) {
				switch (divIndex) {
					case 1:
						if (document.querySelector('text'))
							document.querySelector('text').remove();
						break;

					case 2:
						document.querySelector('svg').classList.add('svg-bg')
						break

					case 3:
						if (!document.querySelector('textPath')) {
							document.querySelector('svg').innerHTML += `<text><textPath href="#pathCircle">Текст по окружности</textPath></text>`;
							document.querySelector('codeline:nth-child(5)').innerHTML = `  d="M120 220a100 100 0 1 1 0-200 100 100 0 0 1 0 200z"`;
							document.querySelector('codeline:nth-child(6)').innerHTML = `    id="pathCircle"&gt;&lt;/path&gt;`;

							document.querySelector('codeline:nth-child(7)').innerHTML = `  &lt;text&gt;`;
							document.querySelector('codeline:nth-child(8)').innerHTML = `    &lt;textPath href="#pathCircle"&gt;`;
							document.querySelector('codeline:nth-child(10)').innerHTML = `      Текст по окружности`;
							document.querySelector('codeline:nth-child(11)').innerHTML = `    &lt;/textPath&gt;`;
							document.querySelector('codeline:nth-child(12)').innerHTML = `  &lt;/text&gt;`;

							document.querySelector('codeline:nth-child(14)').innerHTML = `&lt;svg&gt;`;
						}
						break

					case 4:
						document.querySelector('textPath').setAttribute('startOffset', '50%');
						document.querySelector('codeline:nth-child(8)').innerHTML = `    &lt;textPath href="#pathCircle"`
						document.querySelector('codeline:nth-child(9)').innerHTML = `      startOffset="50%"&gt;`
						break

						case 6:
							document.querySelector('textPath').setAttribute('text-anchor', 'middle');
							document.querySelector('codeline:nth-child(9)').innerHTML = `      startOffset="50%" text-anchor="middle"&gt;`
						break

					case 7:
						document.querySelector('svg').classList.remove('svg-bg');
						break

					default:
						break;
				}

				currentActiveDiv.classList.remove('active');
			}

			// Получаем текущий <div> и все его <span>
			const currentDiv = divs[divIndex];
			const spans = currentDiv.querySelectorAll('span');

			// Назначаем класс current текущему <span> и класс active текущему <div>
			spans[spanIndex].classList.add('current');
			currentDiv.classList.add('active');

			// Увеличиваем индекс <span>
			spanIndex++;

			// Если вышли за пределы <span> внутри текущего <div>
			if (spanIndex >= spans.length) {
				spanIndex = 0;
				divIndex++;
			}

		}, 350);
	};

	// Запускаем переключение через 5 секунд после загрузки страницы
	setTimeout(startSwitching, 4000);
});
