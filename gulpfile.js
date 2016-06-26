'use strict';

var fs = require('fs');

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    data = require('gulp-data'),
    exec = require('child_process').exec,
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    Transform = require('stream').Transform,
    tslint = require('gulp-tslint'),
    UglifyJS = require('uglify-js'),
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
   gulp.src(HTML_TEMPLATES)
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

var PRODUCTION = 'dist';

var minifyFilesStream = function() {
  var minifyFiles = new Transform({objectMode: true});
  minifyFiles._transform = function(file, __, callback) {
    var result =  UglifyJS.minify(file.contents.toString(), {
      fromString: true
    });
    file.contents = new Buffer(result.code);
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

gulp.task('angular-cli-build', function(done) {
  exec('ng build -prod', function(err, stdout) {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    done();
  });
});

gulp.task('move-server', () =>
  gulp.src('customServer.js').pipe(gulp.dest(PRODUCTION))
);

gulp.task('move-tingle', () =>
  gulp.src('src/app/tingle/tingle.min.js').pipe(gulp.dest(PRODUCTION + '/app'))
);

gulp.task('optimize', () =>
  gulp.src(PRODUCTION + '/index.html')
      .pipe(useref({}, minifyIndividualFiles))
      .pipe(gulpif('*.css', uglifycss()))// Minify the CSS found with uglifycss (no optimization needed, ~100ms)
      .pipe(gulp.dest(PRODUCTION))
);

gulp.task('build', (done) =>
  runSequence(
    'angular-cli-build',
    'move-tingle',
    ['move-server', 'optimize'],
    done
  )
);
