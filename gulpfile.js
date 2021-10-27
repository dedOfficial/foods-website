const gulp = require('gulp');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('styles', function () {
  return gulp
    .src('src/css/**/*.css')
    .pipe(
      rename({
        prefix: '',
        suffix: '.min',
      })
    )
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/css/**/*.css', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function () {
  return gulp.src('src/css/webfonts/*').pipe(gulp.dest('dist/css/webfonts'));
});

gulp.task('img', function () {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task(
  'default',
  gulp.parallel('watch', 'styles', 'scripts', 'fonts', 'img', 'html')
);
