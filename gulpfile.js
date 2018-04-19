'use strict';

const gulp = require('gulp'),
      fs = require('fs'),
      data = require('gulp-data'),
      exec = require('child_process').exec,
      inlineNg2Template = require('gulp-inline-ng2-template'),
      pug = require('gulp-pug'),
      rename = require('gulp-rename'),
      runSequence = require('run-sequence'),
      sass = require('gulp-sass'),
      tslint = require('gulp-tslint');

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
    .pipe(data((file) => {
      return JSON.parse(fs.readFileSync('./src/jacob.json'));
    }))
    .pipe(data((file) => {
      return JSON.parse(fs.readFileSync('./src/demos.json'));
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename((path) => {
        path.extname = '.html';
        return path;
    }))
    .pipe(gulp.dest('src/app'))
);

gulp.task('watch-pug', () => gulp.watch(HTML_TEMPLATES, ['pug']) );

// JS Specific

const JS_FILES = ['e2e/**/*.ts', 'src/**/*.ts'];

gulp.task('lint', () =>
    gulp.src(JS_FILES)
        .pipe(tslint({
          formatter: "prose"
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

gulp.task('watch-lint', ['lint'], () => gulp.watch(JS_FILES, ['lint']) );

// JS, CSS And HTML Specific

gulp.task('angular-cli-build', (done) => {
  exec('npm run build-production', { maxBuffer: 1024 * 500 }, (err, stdout) => {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    setTimeout(done, 500);
  });
});

gulp.task('move-src', (done) => {
  exec('rm -rf src_temp; cp -rf src src_temp', (err, stdout) => {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    done();
  });
});

gulp.task('restore-src', (done) => {
  exec('rm -rf src; mv src_temp src', (err, stdout) => {
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

gulp.task('move-robots', () =>
  gulp.src('robots.txt').pipe(gulp.dest(PRODUCTION))
);

gulp.task('move-sitemap', () =>
  gulp.src('sitemap.xml').pipe(gulp.dest(PRODUCTION))
);

// Basic assets like CSS and images are not properly copied over by Web Pack (needs more research)

gulp.task('move-css-to-build', () =>
  gulp.src('src/css/**/*').pipe(gulp.dest(PRODUCTION + '/css'))
);

gulp.task('move-images-to-build', () =>
  gulp.src('src/images/**/*').pipe(gulp.dest(PRODUCTION + '/images'))
);

gulp.task('short-reinstall', (done) => {
  exec('bash bin/install.bash --no-npm-install', (err, stdout) => {
    if (err) {
      throw(err);
    }

    console.log(stdout);
    done();
  });
});

gulp.task('build', (done) =>
  runSequence(
    'move-src',
    'inline-component-templates',
    'angular-cli-build',
    ['move-robots', 'move-sitemap', 'move-server'],
    ['move-css-to-build', 'move-images-to-build'],
    'restore-src',
    'short-reinstall',
    done
  )
);
