// Подключаемые пакеты
import {
	src,
	dest
} from 'gulp';
import svgSprite from 'gulp-svg-sprite';

function sprite() {
	// конфигурация для спрайта
	const spriteConfig = {
		mode: {
			symbol: {
				dest: '.',
				sprite: 'sprite.svg', // название спрайта
				example: false
			}
		},
		shape: {
			id: {
				separator: '--',
				generator: '%s'
			}
		},
		svg: {
			namespaceClassnames: false // отключаем изменение классов
		}
	};

	return src('./src/img/icons/*.svg') // путь к svg иконкам
		.pipe(svgSprite(spriteConfig)) // собираем спрайт
		.pipe(dest('./src/img/')); // путь куда сохраняем спрайт
}

export { sprite };
