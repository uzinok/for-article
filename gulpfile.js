// Подключаемые пакеты
import {
	src,
	dest
} from 'gulp';
import svgSprite from 'gulp-svg-sprite';

function sprite() {

	const spriteConfig = {
		mode: {
			symbol: {
				dest: '.',
				sprite: 'sprite.svg',
				example: false
			}
		},
		shape: {
			id: {
				separator: '--',
				generator: '%s'
			}
		}
	};

	return src('./src/img/icons/*.svg')
		.pipe(svgSprite(spriteConfig))
		.pipe(dest('./src/img/'));
}

export {
	sprite
};
