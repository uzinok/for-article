// Функция для анимации одного элемента
function animateWave(element, duration = 5000) {
	// Отключаем CSS-анимацию, если она была задана
	element.style.animation = 'none';
	// Можно также сохранить прозрачность из CSS, если нужно
	// element.style.opacity = '0.5';
	// Ключевые кадры (аналогичны CSS)
	const keyframes = [{
			time: 0,
			d: "M0 10c50-25 150 25 200 0"
		},
		{
			time: 0.25,
			d: "M0 10c50 0 150 0 200 0"
		},
		{
			time: 0.5,
			d: "M0 10c50 25 150 -25 200 0"
		},
		{
			time: 0.75,
			d: "M0 10c50 0 150 0 200 0"
		},
		{
			time: 1,
			d: "M0 10c50-25 150 25 200 0"
		}
	];
	// Извлекаем числа из каждого ключевого кадра
	const parsedFrames = keyframes.map(frame => {
		const numbers = frame.d.match(/-?\d+\.?\d*/g);
		if (!numbers) {
			console.error('Не удалось извлечь числа из строки:', frame.d);
			return { time: frame.time, numbers: [] }; // запасной вариант
		}
		return { time: frame.time, numbers: numbers.map(Number) };
	});
	// Запоминаем время старта анимации
	const startTime = performance.now();
	// Функция обновления кадра
	function updateFrame() {
		const now = performance.now();
		const elapsed = (now - startTime) % duration; // циклическое время
		const progress = elapsed / duration; // прогресс от 0 до 1
		// Находим два ключевых кадра, между которыми находится progress
		let i = 0;
		while (i < parsedFrames.length - 1 && parsedFrames[i + 1].time < progress) {
			i++;
		}
		const frameA = parsedFrames[i];
		const frameB = parsedFrames[i + 1];
		// Коэффициент интерполяции между кадрами
		const factor = (progress - frameA.time) / (frameB.time - frameA.time);
		// Линейная интерполяция каждого числового значения
		const interpolated = frameA.numbers.map((val, idx) =>
			val + factor * (frameB.numbers[idx] - val)
		);
		// Собираем строку атрибута d
		// Формат: Mx y c ... (сохраняем первые два числа для M)
		const d = `M${interpolated[0]} ${interpolated[1]}c${interpolated.slice(2).join(' ')}`;
		element.setAttribute('d', d);
		// Запрашиваем следующий кадр
		requestAnimationFrame(updateFrame);
	}
	// Запускаем анимацию
	requestAnimationFrame(updateFrame);
}
// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
	// Находим все элементы с классом wave
	const waves = document.querySelectorAll('.wave');
	waves.forEach(el => animateWave(el));
});
