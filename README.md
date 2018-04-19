Portfolio Website
=================
This is the fifth version of my Portfolio website and the second Angular.js version (Using [Angular 2+](https://angular.io/)). The site should be **run using Node.js 6.9.x+**. Also, NPM 3.10.x or greater should be used to overcome issues with installing the newer projects.

This site was created to provide a much simpler software and visual design relative to the older site. The philosophy is to employ as much preprocessing, testing and automated tools to make development as fast as possible. While this approach results in extremely fast development, I would probably not take things as far when a project needs to account for the learning curves of other developers. For example, I would probably not use Pug (formerly Jade), the HTML Preprocessor. Finally, due to the small size, practices like multi-module systems were not used because they would add implementation overhead without providing much maintainability.

**Files And Folders (Top Level)**
 * **bin/** Files used before the main dependencies such as the Angular CLI are present e.g. install scripts.
 * **dist/** A generated folder containing the production built static assets.
 * **e2e/** All E2E test specifications are here.
 * **node_modules/** All 3rd party libraries used in development and running of this site.
 * **src/** All the unbuilt files. Edit these as you develop.
 * **app.js** The Express server definition. This defines how to run files in production.
 * **customServer.js** A backup server for running production code in case the Express server errors for a strange reason.
 * **gulpfile.js** Defines all the tasks that Angular CLI does not cover such as builds with minification.
 * **package.json** Defines all the libaries and their version to be installed with `npm install`.
 * **robots.txt** Defines where various webcrawlers can go. This should be copied into the public directory.
 * **sitemap.xml** Defines the locations of the site for webcrawlers making the site more SEO friendly.
 * **tslint.json** Defines all rules that will be used for the linting system.

Technologies & Architecture
===========================
Before diving into the code, it is helpful to know the basics of the technologies and architecture so you have a roadmap of where things fit.

**Technologies**
 * **[Node.js](https://nodejs.org/en/)** A runtime that runs over Chrome's JavaScript engine that allows you to write server side JavaScript. Many user interface libaries are written for Node.js, so it drastically reduces the amount of code used.
 * **[Gulp.js](https://nodejs.org/en/)** Used to run all the tasks not supported by Angular CLI. Implemented via streams.
 * **[Angular CLI](https://github.com/angular/angular-cli)** Used to run commands such as the development server and to generate various client side files. It is recommended that you read through the whole README there.
 * **[Angular 2](https://angular.io/)** A single page JavaScript framework that is based on extending HTML by using a component tree. It is recommended that you go through the tutorial [here](https://angular.io/docs/ts/latest/tutorial/).
 * **[Express](http://expressjs.com/)** An extremely minimal non-opinionated Node.js server. See `app.js` to see how it was configured. 
 * **[TS Lint](https://palantir.github.io/tslint/)** Used to lint all files. Similar to ESLint.
 * **[Jasmine](http://jasmine.github.io/2.4/introduction.html)** Used to run all the tests (End to End and unit tests).
 * **[Karma](https://karma-runner.github.io/1.0/index.html)** Used to manage running unit tests in multiple browsers. See the `config` folder.
 * **[Protractor](http://www.protractortest.org/#/)** Used to run tests in browsers using Selenium. See the `config` folder.
 * **[Webpack](http://webpack.github.io/docs/what-is-webpack.html)** Used to modularize all assets. Integrated into Angular CLI.

**Architecture**
 
 1. Files are installed and copied from various `node_modules`, see `bin/install.bash`.
 2. Pug files are transformed into HTML files automatically which read various JSON config files.
 3. SCSS is also transformed to CSS on changes.
 4. TypeScript is dynamically translated while running in development via Angular CLI.
 5. There are no internal AJAX requests (other than for blog data), all data is generated before load to eliminate roundtrips.
 6. The system is run via Express once it has been built. Building converts all assets into their base versions (e.g. SCSS to CSS). Then concatenates and minifies them.
 7. When common libraries are used, they are not stored locally. They are loaded via a CloudFlare CDN (Content Delivery Network).

Install
=======
To Install

    bash bin/install.bash# --no-npm-install to skip any NPM dependency installations

OS X only:

    brew install watchman

Development
===========
To run use:

    npm start

For the various watchers:

    gulp watch-pug
    gulp watch-lint
    # unit tests
    npm test
    # brower tests
    npm run e2e


**Target Desktop Browsers**
  * Chrome
  * Firefox
  * Safari
  * IE (Low priority)

**Target Mobile Browsers**
  * Chrome
  * Safari

Deployment
==========
Build everything into a `dist` production folder. **Make sure no servers and no watchers are running**:

    gulp build

Use express 4 to run the site:

    node app.js 5000

If the Express server fails or cannot run a basic pure Node.js backup server can also be run in dist:

    node dist/customServer.js 5000

Testing
=======
Unit tests:

    ng test

E2Es using Protractor:

    ng e2e

License
=======
See MIT_License.txt
