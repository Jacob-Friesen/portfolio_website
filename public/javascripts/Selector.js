// Pre jQuery load (for speed reasons), object is accessible so it can be used later to change interfaces
var Selector = {
    MOBILE_DOMAIN: "http://m.jacobfriesen.com",
    NOSCRIPT_DOMAIN: "/no_script",
    INDEX_PAGE: "index",
    mode: 'desktop',
    
    scripts: {
        js_loaded: [],
        
        desktop: {
            js_location: 'javascripts/desktop/',
            js: [
                'min.js'
                //'constants.js',
                //'jquery.lightbox_me.min.js',
                //'jquery.watcher.min.js',
                //'jquery.canvas_drag0.5.min.js',
                //'jquery.window_tiles.js',
                //'jquery.icbm.js',
                //
                //'Utility.js',
                //'System.js',
                //'Skills.js',
                //'Experience.js',
                //'Demos.js',
                //'Blog.js'
            ],
            
            css_location: '/stylesheets/desktop/',
            css: [
                'style_c.css',
                'experience_c.css',
                'skills_c.css',
                'demos_c.css',
                'window_tiles_c.css',
                'icbm_c.css'
            ]
        },
        
        mobile: {
            css_location: '/stylesheets/mobile/',
            css: [
                'style.css',
                'experience.css',
                'skills.css',
                'demos.css',
                'blog.css'
            ],
            js_location: '/javascripts/mobile/',
            js: [
                'min.js'
                //'constants.js',
                //'jquery.lightbox_me.min.js',
                //
                // 'Menu.js'
                //'Utility.js',
                //'System.js',
                //'Skills.js',
                //'Experience.js',
                //'Demos.js'
            ]
        }
    },
    
    // tracks what has been loaded so far
    loaded: {
        pages: 0,
        js: 0,
        css: 0
    },
    PAGES_TO_LOAD: 2,
    
    // Takes the user agent with the screen width to render the appropriate interface
    init: function(dont_run, width, user_string){
        var MOBILE_WIDTH = 720;
        var MOBILE_STRING = "mobile";
        
        // pre
        if (typeof mocha !== "undefined" && dont_run)
            return this;
        
        if (user_string.search(MOBILE_STRING) > 0 || width <= MOBILE_WIDTH)
            this.render_mobile();
        else
            this.render_desktop();
            
        return this;
    },
    
    // Same as desktop just different pages are loaded
    render_mobile: function(){
        this.mode = 'mobile';
        
        //window.location = this.MOBILE_DOMAIN;
        
        this.load_css();
        this.load_js();
        this.load_pages(window.location);
    },
    
    // Loads specified page or if it can't goes to no script page.
    render_desktop: function(){
        this.mode = 'desktop';
        document.body.style.display = 'none';// ensures page load looks smooth
        
        this.load_css();
        this.load_js();
        this.load_pages(window.location);
    },
    
    // starts up the system loading the required scripts
    start_system: function(){
        document.body.style.display = 'block';
        
        for (var i = 0; i < this.scripts.js_loaded.length; i += 1)
            eval(this.scripts.js_loaded[i]);
        start_system();
    },
    
    is_system_loaded: function(){
        if(this.loaded.css == this.scripts[this.mode].css.length &&
           this.loaded.js == this.scripts[this.mode].js.length &&
           this.loaded.pages == this.PAGES_TO_LOAD)
            return true;
        return false;
    },
    
    get_mode_string: function(){
        return '{"mode": "'+this.mode+'"}';
    },
    
    // Uses AJAX to load a script into an object for later execution
    load_js: function(){
        var parent = this;
        
        for (var s = 0; s < this.scripts[this.mode].js.length; s += 1){
            this.ajax_load('GET', this.scripts[this.mode].js_location + this.scripts[this.mode].js[s], null, function(response){
                parent.scripts.js_loaded.push(response);
                parent.loaded.js += 1;
            });
        }
    },
    
    load_css: function (){
        for (var c = 0; c < this.scripts[this.mode].css.length; c += 1){
            var stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.type = "text/css";
            stylesheet.href = this.scripts[this.mode].css_location + this.scripts[this.mode].css[c];
            document.head.appendChild(stylesheet);
            
            this.loaded.css += 1;
        }
    },
    
    // Loads the index and specified address, no callbacks this just starts the calls
    load_pages: function(address){
        var parent = this;
        
        if (!parent.ajax_load('POST', this.INDEX_PAGE, document.body, function(response){
            parent.loaded.pages += 1;
        }, this.get_mode_string())){
            window.location(NOSCRIPT_DOMAIN);
        }
        
        // OPTIMIZATION: Preload needed page into cache
        var page = (address + "").replace('#','');
        var path = address.pathname;
        if (typeof address.pathname === 'undefined'){
            path = page = '/home';
        }
        else if (address.pathname === '/'){
            page += 'home';
            path = 'home';
        }
            
        if (!this.ajax_load('POST', page, null, function(response){
            var div = document.createElement('div');
            div.id = path.replace('/','').replace('#','') + "_cache";
            div.style.display = 'none';
            div.innerHTML = response
            document.body.appendChild(div);
            
            parent.loaded.pages += 1;
        }, this.get_mode_string())){
            window.location(NOSCRIPT_DOMAIN);
        }
    },
    
    // Loads the given contents of the page into the given element and then calls the callback, with the
    // retrieved data. mode is either POST or GET (the routes accept no other verbs), to_send sends specified
    // data if in post mode (must be a string).
    // NOTE: all to_send content is assumed to be JSON
    ajax_load: function (mode, page, element, callback, to_send){
        // Gets an asynchronous requester if it can be found
        function get_XMLHttpRequest(){
            if (window.XMLHttpRequest)
                return new window.XMLHttpRequest;
            else {
                try {
                    return new ActiveXObject("MSXML2.XMLHTTP");
                } catch (ex) {
                    return null;
                }
            }
        }
        
        // On complete load page into the element then call the callback with the retreived data
        function handler() {
            if (requester.readyState == 4) {
                if (requester.status == 200) {
                    if (element != null){
                        if (typeof element.innerHTML === 'undefined' || element.innerHTML === '')
                            element.innerHTML = '';
                        element.innerHTML += requester.responseText;
                    }
                    if (callback != null)
                        callback(requester.responseText);
                }
            }
        }
        
        var requester = get_XMLHttpRequest();
        if (requester == null)
            return false;
        else{
            requester.open(mode, page, true);
            requester.setRequestHeader("Content-Type", "application/json");
            requester.onreadystatechange = handler;
            requester.send(to_send);
        }
        
        return true;
    }
}.init(true, screen.width, navigator.userAgent.toLowerCase());

// Event loop to check when everything is loaded, once loaded evaluate the js and start the system
(function loaded(){
    if (Selector.is_system_loaded() && typeof mocha === "undefined")
        Selector.start_system();
    else
        setTimeout(loaded, 50);
})();