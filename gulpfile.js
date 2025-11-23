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
			css: { // Activate the «css» mode
				render: {
					css: true // Activate CSS output (with default options)
				}
			}
		}
	};

	return src('./src/img/icons/*.svg') // путь к svg иконкам
		.pipe(svgSprite(spriteConfig)) // собираем спрайт
		.pipe(dest('./src/img/')); // путь куда сохраняем спрайт
}

function stack() {
	// конфигурация для спрайта
	const stackConfig = {
		mode: {
			stack: { // Ключевое изменение - используем режим stack
				dest: '.',
				sprite: 'stack.svg', // Можно изменить имя файла
			}
		},
		shape: {
			id: {
				separator: '--',
				generator: '%s'
			}
		},
		svg: {
			namespaceClassnames: false
		}
	};

	return src('./src/img/icons/*.svg') // путь к svg иконкам
		.pipe(svgSprite(stackConfig)) // собираем спрайт
		.pipe(dest('./src/img/')); // путь куда сохраняем спрайт
}

export { sprite, stack };
