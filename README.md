Portfolio Website
=================

A new simpler rewrite of the portfolio website. This is in development and can be viewed at [jacobfriesen.com:4200](http://jacobfriesen.com:4200).

Install
=======
An installer script will be added later when things are finalized. For now:

    npm install -g angular-cli
    npm install

OS X only:

    brew install watchman

Development
===========
To run use:

    ng serve --port 8000

For the various watchers:

    gulp watch-pug
    gulp watch-css
    gulp test

Testing
=======
Unit tests:

    ng test

E2Es using Protractor:

    ng e2e

Linting
=======
Unit tests:

    gulp watch-lint

License
=======
See MIT_License.txt
