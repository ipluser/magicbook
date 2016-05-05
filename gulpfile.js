var gulp = require('gulp');  // eslint-disable-line
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build-css', function buildCss() {
  return gulp.src('public/css/magicbook.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('build-script', function buildScript() {
  return gulp.src('lib/magicbook.js')
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('dist'));
});

gulp.task('build-plugins-markdown-css', function buildPluginsMarkdownCss() {
  return gulp.src(['plugins/markdown/css/*.css', '!plugins/markdown/css/*.min.css'])
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('plugins/markdown/css'));
});

gulp.task('build-plugins-markdown-script', function buildPluginsMarkdownScript() {
  return gulp.src(['plugins/markdown/js/*.js', '!plugins/markdown/js/*.min.js'])
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('plugins/markdown/js'));
});

gulp.task('build-plugins-components-css', function buildPluginsComponentsCss() {
  return gulp.src(['plugins/components/css/*.css', '!plugins/components/css/*.min.css'])
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('plugins/components/css'));
});

gulp.task('build-plugins-components-script', function buildPluginsComponentsScript() {
  return gulp.src(['plugins/components/js/*.js', '!plugins/components/js/*.min.js'])
      .pipe(uglify())
      .pipe(rename({extname: '.min.js'}))
      .pipe(gulp.dest('plugins/components/js'));
});

gulp.task('default', [
  'build-css',
  'build-script',
  'build-plugins-markdown-css',
  'build-plugins-markdown-script',
  'build-plugins-components-css',
  'build-plugins-components-script'
]);
