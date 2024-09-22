const setupSelectHandlers = () => {
	const selectNodes = document.querySelectorAll('.select');
	selectNodes.forEach((selectNode) => { // Находим необходимые элементы внутри селекта
		const selectButtonNode = selectNode.querySelector('.select__button');
		const selectListNode = selectNode.querySelector('.select__list');
		const selectItemNodes = selectNode.querySelectorAll('.select__item');
		const selectInputNode = selectNode.querySelector('.select__input');
		const isListVisible = () => selectListNode.classList.contains('select__list--visible');
		const toggleSelect = () => { // Переключаем видимость списка
			selectListNode.classList.toggle('select__list--visible');
			selectButtonNode.classList.toggle('select__button--rotated');
		};
		const handleOutsideClick = (event) => { // Обрабатываем клик вне селекта
			if (!selectNode.contains(event.target) && isListVisible()) {
				toggleSelect();
			}
		};
		const selectItem = (item) => { // Выбираем элемент из списка выбора
			selectButtonNode.innerText = item.innerText.trim();
			selectInputNode.value = item.dataset.value;
			toggleSelect();
			selectButtonNode.focus();
		};
		const focusNextItem = (currentIndex, direction) => { // Фокусировка на следующем элементе списка выбора
			const nextIndex = (currentIndex + direction + selectItemNodes.length) % selectItemNodes.length; // Вычисляем индекс следующего элемента, на котором нужно сосредоточиться
			selectItemNodes[nextIndex].focus();
		};
		selectButtonNode.addEventListener('click', (event) => { // Обработчик клика по кнопке селекта
			event.stopPropagation();
			toggleSelect();
		});
		selectItemNodes.forEach((selectItemNode) => { // Обработчики клика по элементам списка
			selectItemNode.addEventListener('click', () => selectItem(selectItemNode));
		});
		selectNode.addEventListener('keydown', (event) => { // Обработчик нажатий клавиш
			if (isListVisible()) {
				if (event.key === 'Enter' || event.key === ' ') { // Выбор элемента по Enter или пробелу
					event.preventDefault();
					const focusedItem = document.activeElement;
					if (focusedItem.classList.contains('select__item')) {
						selectItem(focusedItem);
					}
				} else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { // Навигация по списку стрелками
					event.preventDefault();
					const focusedItem = document.activeElement;
					const currentIndex = Array.from(selectItemNodes).indexOf(focusedItem);
					const direction = event.key === 'ArrowDown' ? 1 : -1;
					focusNextItem(currentIndex, direction);
				} else if (event.key === 'Escape') { // Закрытие списка выбора по Escape
					toggleSelect();
					selectButtonNode.focus();
				}
			} else if (event.key === 'Enter' || event.key === ' ') { // Открытие списка по Enter или пробелу
				event.preventDefault();
				toggleSelect();
			}
		});
		document.addEventListener('click', handleOutsideClick); // Закрытие списка выбора при клике вне селекта
		document.addEventListener('keydown', (event) => { // Закрытие списка при нажатии Tab
			if (event.key === 'Tab' && isListVisible()) {
				toggleSelect();
			}
		});
	});
};

setupSelectHandlers();
