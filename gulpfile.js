'use strict';

var fs = require('fs');

var gulp = require('gulp');
var data = require('gulp-data');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

// CSS Specific

var CSS_TEMPLATES = 'src/scss/**/*.scss';

gulp.task('scss', function() {
  return gulp.src([CSS_TEMPLATES])
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('src/css'));
});

gulp.task('watch-css', function() {
  gulp.watch(CSS_TEMPLATES, ['scss']);
});

// HTML Specific

var HTML_TEMPLATES = 'src/app/**/*.pug';

gulp.task('pug', function() {
  return gulp.src('src/app/**/*.pug')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./src/jacob.json'));
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename(function(path) {
        path.extname = '.html';
        return path;
    }))
    .pipe(gulp.dest('src/app'));
});

gulp.task('watch-pug', function() {
  gulp.watch(HTML_TEMPLATES, ['pug']);
});

// JS Specific


// TRIFORCE!! (JS, CSS And HTML Specific)