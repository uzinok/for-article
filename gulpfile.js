import gulp from 'gulp';

import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';

import imagemin, { svgo } from 'gulp-imagemin';

export function sprite() {
	return gulp
		.src("src/img/icon/*.svg")
		.pipe(imagemin([
			svgo({
				plugins: [
					{
						name: 'removeViewBox',
						active: true
					},
					{
						name: 'cleanupIDs',
						active: false
					}
				]
			})
		]))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename({ basename: 'sprite' }))
		.pipe(gulp.dest("src/img/"));
}
