# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Run production build:

```bash
# npm
npm run production
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

Portfolio Website
=================
This is the sixth version of my Portfolio website and the first Vue.js version. More details coming soon.

**Files And Folders (Top Level)**
 * **app/** Main locations of all UI components.
 * **public/** Publicly downloadable files.
 * **server/** Server side code.
 * TBD

Technologies & Architecture
===========================
Before diving into the code, it is helpful to know the basics of the technologies and architecture so you have a roadmap of where things fit.

**Technologies**
 * **[Node.js](https://nodejs.org/en/)** A runtime that runs over Chrome's JavaScript engine that allows you to write server side JavaScript. Many user interface libaries are written for Node.js, so it drastically reduces the amount of code used.
 * TBD

**Architecture**
TBD

Install
=======
TBD

To Install

    bash bin/install.bash# --no-npm-install to skip any NPM dependency installations

OS X only:

    brew install watchman

Development
===========
TBD

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
TBD

Manual
------
1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
2. source ~/.bashrc
3. READ_ONLY_ACCESS_TOKEN="<PAT HERE>"
4. git clone https://$READ_ONLY_ACCESS_TOKEN@github.com/Jacob-Friesen/portfolio_website.git
5. cd portfolio-website
6. git checkout v6
7. "nvm install" to get the current node and NPM versions
8. "npm ci" to make everything run
9. "npm run build" to build everything
10. To forward 3000 to 80: sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
11. "npm run production &" to start the application - docker or PM2 needed later
    - A process manager or Docker will be added later
12. View it at the public IP address like: http://v6.jacobfriesen.com
    - The IP has been temporarily hooked up to a sub domain of the main one

Automatic
---------
TBD

Build everything into a `dist` production folder. **Make sure no servers and no watchers are running**:

    gulp build

Use express 4 to run the site:

    node app.js 5000

If the Express server fails or cannot run a basic pure Node.js backup server can also be run in dist:

    node dist/customServer.js 5000

Testing
=======
TBD

Unit tests:

    npm test

E2Es using Protractor:

    npm run e2e

License
=======
See MIT_License.txt

