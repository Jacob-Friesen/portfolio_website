Portfolio Website
=================

A new simpler rewrite of the portfolio website. This is in development and can be viewed at [jacobfriesen.com:4200](http://jacobfriesen.com:4200). Finally, it is not supported by a proper server, so it only reloads to that exact address.

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

To build in a somewhat compressed way (Angular CLI still has a way to go on this):

   ng build -prod
   # Tingle is not getting properly copied by Angular CLI
   cp src/app/tingle/tingle.min.js dist/app/tingle/tingle.min.js

Then copy the custom server if there is no external one on a server:

   cp customServer.js dist/server.js

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
