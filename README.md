Portfolio Website
=================

A new simpler rewrite of the portfolio website. This is in development and can be viewed at [jacobfriesen.com:4200](http://jacobfriesen.com:4200). The site should be **run using Node.js 4.2.x**, but will probably work fine with other versions.

Install
=======
An installer script will be added later when things are finalized. For now:

    bash bin/install.bash# --no-npm-install to skip any NPM dependency installations

OS X only:

    brew install watchman

Development
===========
To run use:

    ng serve --port 8000

If that fails use the more direct version that runs on development (does not support reloads on non basic urls):
   
   node dist/server.js 9000

For the various watchers:

    gulp watch-pug
    gulp watch-css
    gulp test

Deployment
==========
Build everything into a `dist` production folder:

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

Linting
=======
Unit tests:

    gulp watch-lint

License
=======
See MIT_License.txt
