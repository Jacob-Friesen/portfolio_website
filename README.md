Portfolio Website
=================

My new integrated mobile desktop portfolio website (under development). The prototype can be found [here](http://jacobfriesen.xen.prgmr.com:9002). This is the culmination of my attempts at making an interface with no comprimises: 
 
 * Single domain with no unecessary scripts/loads for any interface (A problem with most media query based adaptations)
 * Full AJAX page loads (~250ms)
 * Bookmarkable pages and revisitable pages
 * Manual caching to ensure pages load instantly after they are opened once on the site
 * A unified object oriented approach for all the JS

Architecture
=====================               
This is a express app (Node.js based) that mimics page loads via AJAX and history.pushState (HTML5), falling back to hash loading on older browsers. Currently it supports Phone and Desktop/Laptop interfaces.

1. A very light page is loaded containing:
 * The inlined (and minified) mobile interface code (Selector.js in source)
 * All meta tags except viewport which is added once the interface type is determined
 * Common JS files across the interfaces
2. If client is an older IE or is not using JavaScript the no_script interface is loaded
3. Client is chosen and specific scripts and index page is loaded
4. Once all scripts and pages have been loaded the system is started for the interface

Testing
=======
Still need to add Selenium GUI tests and convert a little bit of the Jasmine testing, but here is the main testing setup:

 * Base: Mocha.js
 * Assertions: Chai.js
 * Stubs and Such: Sinon.js
 
Interfaces Supported
====================
More to come soon.

 * Desktop
    * Firefox
    * Chrome
    * Opera
 * Mobile
    * Android
        * 4.2 Default Browser (should support 4.1s and 4.0s too)
        * Chrome
        * Dolphin
        * Firefox [Partial]
        * Opera [Partial]

Future
======
More integration between the interfaces namely a more responsive-like design (without media queries). This also means JS and CSS inheritance between the interfaces. Finally I need to upgrade to Express 3.

License
=======
MIT so you can do whatever you want with the code here as long as you don't remove the MIT license when using major portions of the codebase (>10%).
