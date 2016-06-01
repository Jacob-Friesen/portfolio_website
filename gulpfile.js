'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

// CSS Specific

var TEMPLATES = 'src/scss/**/*.scss';

gulp.task('scss', function() {
  return gulp.src([TEMPLATES])
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('src/css'));
});

gulp.task('watch-css', function() {
  gulp.watch(TEMPLATES, ['scss']);
});

// JS Specific


// TRIFORCE!! (JS, CSS And HTML Specific)