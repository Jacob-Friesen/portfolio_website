'use strict';

const fs = require('fs');

const gulp = require('gulp'),
      gulpif = require('gulp-if'),
      data = require('gulp-data'),
      exec = require('child_process').exec,
      inlineNg2Template = require('gulp-inline-ng2-template'),
      pug = require('gulp-pug'),
      rename = require('gulp-rename'),
      runSequence = require('run-sequence'),
      sass = require('gulp-sass'),
      Transform = require('stream').Transform,
      tslint = require('gulp-tslint'),
      ts = require('gulp-typescript'),
      UglifyJS = require('uglify-js'),
      uglifycss = require('gulp-uglifycss'),
      useref = require('gulp-useref');

const PRODUCTION = 'dist';

// CSS Specific

const CSS_TEMPLATES = 'src/scss/**/*.scss';

gulp.task('scss', () =>
  gulp.src([CSS_TEMPLATES])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
);

gulp.task('watch-css', () => gulp.watch(CSS_TEMPLATES, ['scss']) );

// HTML Specific

const HTML_TEMPLATES = 'src/app/**/*.pug';

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

const JS_FILES = ['e2e/**/*.ts', 'src/**/*.ts'];

gulp.task('tslint', () =>
    gulp.src(JS_FILES)
        .pipe(tslint({
          formatter: "verbose"
        }))
        .pipe(tslint.report())
);

gulp.task('inline-component-templates', () =>
    gulp.src(JS_FILES[1])
        .pipe(inlineNg2Template({ 
          base: '/src/app',
          useRelativePaths: true
        }))
        .pipe(gulp.dest('src'))
);

gulp.task('watch-lint', () => gulp.watch(JS_FILES, ['tslint']) );

// TRIFORCE!! (JS, CSS And HTML Specific)

const minifyFilesStream = function() {
  const minifyFiles = new Transform({objectMode: true});
  minifyFiles._transform = function(file, __, callback) {
    const result =  UglifyJS.minify(file.contents.toString(), {
      fromString: true
    });
    file.contents = new Buffer(result.code);
    callback(null, file);
  };

  return minifyFiles;
};

const fileNeedsMinification = function(file) {
  return file.path.indexOf('.js') > -1 && file.path.indexOf('.min') < 0;
};

const minifyIndividualFiles = function() {
  return gulpif(fileNeedsMinification, minifyFilesStream());
};

gulp.task('angular-cli-build', function(done) {
  exec('ng build -prod', function(err, stdout) {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    setTimeout(done, 500);
  });
});

gulp.task('move-src', function(done) {
  exec('rm -rf src_temp; cp -rf src src_temp', function(err, stdout) {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    done();
  });
});

gulp.task('restore-src', function(done) {
  exec('rm -rf src; mv src_temp src', function(err, stdout) {
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

gulp.task('move-tingle-js', () =>
  gulp.src('src/app/tingle/tingle.min.js').pipe(gulp.dest(PRODUCTION + '/app'))
);

gulp.task('move-tingle-css', () =>
  gulp.src('src/app/tingle/tingle.min.css').pipe(gulp.dest(PRODUCTION + '/css/tingle'))
);

gulp.task('move-robots', () =>
  gulp.src('robots.txt').pipe(gulp.dest(PRODUCTION))
);

gulp.task('move-sitemap', () =>
  gulp.src('sitemap.xml').pipe(gulp.dest(PRODUCTION))
);

gulp.task('short-reinstall', function(done) {
  exec('bash bin/install.bash --no-npm-install', function(err, stdout) {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    done();
  });
});

gulp.task('optimize', () =>
  gulp.src(PRODUCTION + '/index.html')
      .pipe(useref({}, minifyIndividualFiles))
      .pipe(gulpif('*.css', uglifycss()))// Minify the CSS found with uglifycss (no optimization needed, ~100ms)
      .pipe(gulp.dest(PRODUCTION))
);

gulp.task('build', (done) =>
  runSequence(
    'move-src',
    'inline-component-templates',
    'angular-cli-build',
    ['move-tingle-js', 'move-tingle-css', 'move-robots', 'move-sitemap', 'move-server'],
    'optimize',
    'restore-src',
    'short-reinstall',
    done
  )
);
