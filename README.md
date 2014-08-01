Portfolio Website
=================

My integrated interface portfolio website, which is the 5th major revision of my website. There are still revisions needed for the build/compile process and css organization. This site is [here](http://jacobfriesen.com). This is the culmination of my attempts at making an interface with no comprimises: 
 
 * Single domain with no unecessary scripts/loads for any interface (A problem with most media query based adaptations)
 * Full AJAX page loads (~200ms)
 * Bookmarkable pages and revisitable pages (browser back and forward buttons still work)
 * Manual caching to ensure pages load instantly after they are opened once on the site
 * A unified object oriented approach for all the JS

Architecture
=====================               
This is an express app (Node.js based) that mimics page loads via AJAX and history.pushState (HTML5), falling back to hash loading on older browsers. Currently it supports Phone and Desktop/Laptop interfaces.

1. A very light page is loaded containing:
 * The inlined (and minified) mobile interface code (Selector.js in source)
 * All meta tags except viewport which is added once the interface type is determined
2. If client is an older IE or is not using JavaScript the no_script interface is loaded
3. Client is chosen and specific scripts and index page is loaded
4. Once all scripts and pages have been loaded the system is started for the interface

Testing
=======
Uses Karma for all tests. All test configurations are stored in config.

**To run all tests:** make test-all or make test-a

**Unit Tests:** Covers all lower level code, especially controllers.

 * **Run them once:** make test or make test-u or make test-unit
 * **Run them with every code change:** make test-w or make test-u-w or make test-unit-watch

**End to End Tests:** Tests the client interface without using client side JavaScript.

 * **Run them once:** make test-e or make test-end-to-end
 * **Run them with every code change:** make test-e-w or make test-end-to-end-watch
 * The only way to test mobile currently is to change this.render_desktop(); to this.render_mobile();
 
Interfaces Supported
====================
These are the browsers I tested for, the site probably works in other browsers but I don't want to speculate.

 * Desktop
    * Firefox
    * Chrome
    * Opera
    * IE 9
    * IE 8
    * IE 7 (no script interface only)
 * Mobile
    * Android
        * 2.2 Default Browser
        * 4.2 Default Browser (should support 4.1s and 4.0s too)
        * Chrome
        * Dolphin
        * Firefox
        * Opera
    * iOS
        * Safari for iOS 4, 5 and 6

Future
======
More integration between the interfaces namely a more responsive-like design (without media queries). This also means JS and CSS inheritance between the interfaces.

License
=======
MIT so you can do whatever you want with the code here as long as you don't remove the MIT license when using major portions of the codebase (>10%).
