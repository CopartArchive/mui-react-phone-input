const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css')));

gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
