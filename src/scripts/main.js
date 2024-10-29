document.addEventListener("DOMContentLoaded", () => {
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
						document.querySelector('table').classList.add('bg-1')
						break;

					case 2:
						document.querySelector('table').classList.add('bg-2')
						break

					case 3:
						document.querySelector('table').classList.add('bg-3')
						break

					case 4:
						document.querySelector('table').classList.add('bg-4')
						break

					case 5:
						document.querySelector('table').classList.add('bg-5')
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
