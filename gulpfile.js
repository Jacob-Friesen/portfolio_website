'use strict';

var fs = require('fs');

var gulp = require('gulp');
var data = require('gulp-data');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var tslint = require('gulp-tslint');

// CSS Specific

var CSS_TEMPLATES = 'src/scss/**/*.scss';

gulp.task('scss', () =>
  gulp.src([CSS_TEMPLATES])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
);

gulp.task('watch-css', () => gulp.watch(CSS_TEMPLATES, ['scss']) );

// HTML Specific

var HTML_TEMPLATES = 'src/app/**/*.pug';

gulp.task('pug', () =>
   gulp.src('src/app/**/*.pug')
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
    .pipe(gulp.dest('src/app'))
);

gulp.task('watch-pug', () => gulp.watch(HTML_TEMPLATES, ['pug']) );

// JS Specific

var JS_FILES = ['e2e/**/*.ts', 'src/**/*.ts'];

gulp.task('tslint', () =>
    gulp.src(JS_FILES)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
);

gulp.task('watch-lint', () => gulp.watch(JS_FILES, ['tslint']) );

// TRIFORCE!! (JS, CSS And HTML Specific)