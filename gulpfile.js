const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('build-script', function () {
  return gulp.src('lib/magicbook.js')
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function () {
  return gulp.src('public/css/magicbook.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('build-plugins-markdown-awesome-css', function () {
  return gulp.src('plugins/markdown/css/awesome.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('plugins/markdown/css'));
});

gulp.task('default', [
  'build-script',
  'build-css',
  'build-plugins-markdown-awesome-css'
]);