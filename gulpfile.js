'use strict';

var fs = require('fs');

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    data = require('gulp-data'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    Transform = require('stream').Transform,
    tslint = require('gulp-tslint'),
    uglifycss = require('gulp-uglifycss'),
    useref = require('gulp-useref');

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
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./src/demos.json'));
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

var minifyFilesStream = function() {
  var minifyFiles = new Transform({objectMode: true});
  minifyFiles._transform = function(file, __, callback) {
    // var result =  UglifyJS.minify(file.contents.toString(), {
    //   fromString: true
    // });
    // file.contents = new Buffer(result.code);
    callback(null, file);
  };

  return minifyFiles;
};

var fileNeedsMinification = function(file) {
  return file.path.indexOf('.js') > -1 && file.path.indexOf('.min') < 0;
  // console.log('file', file.path)
  // return false;// Used for development until I develop a faster way to minify
};

var minifyIndividualFiles = function() {
  return gulpif(fileNeedsMinification, minifyFilesStream());
};

gulp.task('build', () =>
  gulp.src('dist/index.html')
      // .pipe(rename('index.min.html'))
      .pipe(useref({}, minifyIndividualFiles))
      .pipe(gulpif('*.css', uglifycss()))// Minify the CSS found with uglifycss (no optimization needed, ~100ms)
      .pipe(gulp.dest('dist'))
);