// Pre jQuery load (for speed reasons), object is accessible so it can be used later to change interfaces
var Selector = {
    NOSCRIPT_DOMAIN: "/no_script",
    INDEX_PAGE: "index",
    mode: 'desktop',
    
    scripts: {
        js_loaded: [],
        
        // Common scripts could be put on layout page but then it would be hard to check once there loaded in
        // a general way. Also, this negates a lot of browser imcompatabilities like ignoring defers (Opera) in
        // scripts in the head.
        common: {
            js_location: '',
            js: [
                '/javascripts/jquery.min.js',
                '/javascripts/jquery.lightbox_me.min.js',
                '/constants.min.js'// No JS location due to this
            ]
        },
        
        desktop: {
            js_location: '/javascripts/desktop/',
            js: [
                'min.js'
                //'jquery.watcher.min.js',
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
                //'min.js'
                'Menu.js',
                'Utility.js',
                'Skills.js',
                'Experience.js',
                'Demos.js',
                'System.js'
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
        
        // Add meta for mobile devices
        var meta = document.createElement("meta");
            meta.name = "viewport";
            meta.id = "viewport";
            meta.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(meta);
        
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
        
        // Run each AJAX loaded script
        for (var i = 0; i < this.scripts.js_loaded.length; i += 1){
            var script = document.createElement('script');
                script.text = this.scripts.js_loaded[i];
                script.id = 'script_injection_' + i;
            document.head.appendChild(script);
        }
        
        start_system();
    },
    
    is_system_loaded: function(){
        if (this.loaded.css == this.scripts[this.mode].css.length &&
            this.loaded.js == this.scripts[this.mode].js.length + this.scripts.common.js.length &&
            this.loaded.pages == this.PAGES_TO_LOAD){
                //debugger
                return true;
            }
        return false;
    },
    
    // Adds a invisible div named page_name with innerHTML of page data directly to the body if the div does
    // not already exist. Returns if a cache was created or not.
    add_cache: function(page_name, page_data){
        var id_to_find = page_name.replace('/','').replace('#','') + "_cache";
        
        if (document.getElementById(id_to_find) === null){
            var div = document.createElement('div');
                div.id = id_to_find;
                div.style.display = 'none';
                div.innerHTML = page_data;
            document.body.appendChild(div);
            return true;
        }
        return false;
    },
    
    mode_to_get: function(){
        return '?mode=' + this.mode;
    },
    
    // Uses AJAX to load interface common and current interface scripts into an object for later execution
    load_js: function(){
        var parent = this;
        
        // Preinitialize loaded array so scripts can be inserted into the array in the order this.scripts describes
        this.scripts.js_loaded = new Array(this.scripts.common.js.length + this.scripts[this.mode].js.length);
        
        // Get script at from and place it in order position to be executed
        var load_script = function(from, order) {
            this.ajax_load('GET', from, function(response){
                parent.scripts.js_loaded[order] = response;
                parent.loaded.js += 1;
            });
        }
        
        var mode_length = this.scripts.common.js.length;
        for (var s = 0; s < mode_length; s += 1)
            load_script.call(this, this.scripts.common.js_location + this.scripts.common.js[s], s);
            
        // notice var was not reset
        for (;s < this.scripts[this.mode].js.length + mode_length; s += 1)
            load_script.call(this, this.scripts[this.mode].js_location + this.scripts[this.mode].js[s - mode_length], s);
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
        
        if (!parent.ajax_load('GET', this.INDEX_PAGE + this.mode_to_get(), function(response){
            parent.add_to_body(response);
            parent.loaded.pages += 1;
        })){
            window.location(NOSCRIPT_DOMAIN);
        }
        
        // OPTIMIZATION: Preload needed page into cache
        var page = (address + "").split('#')[0];// Dealing with extra # stuff on the end of links (like #top)
        var path = address.pathname;
        if (typeof address.pathname === 'undefined'){
            path = page = '/home';
        }
        else if (address.pathname === '/'){
            page += 'home';
            path = 'home';
        }
            
        if (!this.ajax_load('GET', page + this.mode_to_get(), function(response){
            parent.add_cache(path, response);
            parent.loaded.pages += 1;
        })){
            window.location(NOSCRIPT_DOMAIN);
        }
    },
    
    add_to_body: function(text){
        if (typeof document.body.innerHTML === 'undefined')
            document.body.innerHTML = '';
        document.body.innerHTML += text;
    },
    
    // Loads the given contents of the page  and then calls the callback, with the retrieved data. mode is
    // either POST or GET (the routes accept no other verbs), to_send sends specified data if in post mode
    // (must be a string).
    // NOTE: all to_send content is assumed to be JSON
    ajax_load: function (mode, page, callback, to_send){
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
        
        // On complete call the callback with the retreived data
        function handler() {
            if (requester.readyState == 4) {
                if (requester.status == 200) {
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