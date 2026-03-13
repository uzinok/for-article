const startD =
	"M41.32 112.5q-36.48 0-36.47-32.41Q5.28 45.15 39 45.15q33.84 1.32 33.07 36.04-2.96 30.21-30.54 31.31l-2.09-11.1Q60 100.41 61.1 80.86q.43-25.27-22.42-27.03Q15.4 55.15 15.4 78.44q2.2 22.41 24.06 22.96Z";
const endD =
	"M26.76 112.5q-4.83 0-4.83-2.97 0-2.63 4.83-2.63 6.26 0 6.26-5.28v-45.8q0-6.27-5.93-6.27-5.16 0-5.16-2.42 0-3.3 5.16-3.3h26.15q5.16 0 5.16 3.08 0 2.64-5.16 2.64-5.27 0-5.27 6.48l-.11 45.04q.1 5.83 5.7 5.83 4.4 0 4.4 2.63 0 2.97-4.28 2.97Z";
const path = document.getElementById('myPath');
const svg = document.getElementById("mySvg");
// Создаём интерполятор с помощью Flubber
const interpolator = flubber.interpolate(startD, endD, {
	maxSegmentLength: 0.1
});
let animFrame = null;
let startTime = null;
const duration = 800; // длительность анимации в мс
let direction = 1; // 1 → к endD, -1 → к startD
// Функция анимации
function animate(timestamp) {
	if (!startTime) startTime = timestamp;
	const elapsed = timestamp - startTime;
	let progress = Math.min(elapsed / duration, 1);
	// Учитываем направление (вперёд/назад)
	if (direction === -1) progress = 1 - progress;
	// Простой easeInOut для плавности
	const eased = progress < 0.5 ?
		2 * progress * progress :
		1 - Math.pow(-2 * progress + 2, 2) / 2;
	// Получаем промежуточный путь и применяем его
	path.setAttribute('d', interpolator(eased));
	if (elapsed < duration) {
		animFrame = requestAnimationFrame(animate);
	} else {
		// По окончании ставим точный конечный путь
		const finalD = direction === 1 ? endD : startD;
		path.setAttribute('d', finalD);
		animFrame = null;
	}
}
// Запуск анимации в нужном направлении
function startAnimation(dir) {
	if (animFrame) cancelAnimationFrame(animFrame);
	direction = dir;
	startTime = null;
	animFrame = requestAnimationFrame(animate);
}
// Обработчики наведения
svg.addEventListener('mouseenter', () => startAnimation(1));
svg.addEventListener('mouseleave', () => startAnimation(-1));
