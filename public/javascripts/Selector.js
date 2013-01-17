// Pre jQuery load (for speed reasons), object is accessible so it can be used later to change interfaces
var Selector = {
    MOBILE_DOMAIN: "http://m.jacobfriesen.com",
    NOSCRIPT_DOMAIN: "/no_script",
    
    // do this??
    scripts: {
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
        js_loaded: [],
        
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
    
    // tracks what has been loaded so far
    loaded: {
        pages: 0,
        js: 0,
        css: 0
    },
    PAGES_TO_LOAD: 2,
    
    // Takes the user agent with the screen width to render the appropriate interface
    init: function(dont_run){
        var MOBILE_WIDTH = 720;
        var MOBILE_STRING = "mobile";
        
        // pre
        if (typeof mocha !== "undefined" && dont_run)
            return this;
        
        if (navigator.userAgent.toLowerCase().search(MOBILE_STRING) > 0 || screen.width <= MOBILE_WIDTH)
            this.render_mobile();
        else
            this.render_desktop();
            
        return this;
    },
    
    // For now just goes to mobile website
    render_mobile: function(){
        window.location = this.MOBILE_DOMAIN;
    },
    
    // Loads specified page or if it can't goes to no script page.
    render_desktop: function(){
        document.body.style.display = 'none';
        
        this.load_css();
        this.load_js();
        this.load_pages();
    },
    
    // Uses AJAX to load a script into an object for later execution
    load_js: function(){
        var parent = this;
        for (var s = 0; s < this.scripts.js.length; s += 1){
            this.ajax_load(this.scripts.js_location + this.scripts.js[s], null, function(response){
                parent.scripts.js_loaded.push(response);
                parent.loaded.js += 1;
            });
        }
    },
    
    is_system_loaded: function(){
        if(this.loaded.css == this.scripts.css.length &&
           this.loaded.js == this.scripts.js.length &&
           this.loaded.pages == this.PAGES_TO_LOAD)
            return true;
        return false;
    },
    
    // starts up the system loading the required scripts
    start_system: function(){
        document.body.style.display = 'block';
        
        for (var i = 0; i < this.scripts.js_loaded.length; i += 1)
            eval(this.scripts.js_loaded[i]);
        start_system();
    },
    
    load_css: function (){
        for (var c = 0; c < this.scripts.css.length; c += 1){
            var stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.type = "text/css";
            stylesheet.href = this.scripts.css_location + this.scripts.css[c];
            document.head.appendChild(stylesheet);
            
            this.loaded.css += 1;
        }
    },
    
    // Loads the index and specified address page
    load_pages: function(){
        var parent = this;
        
        if (!parent.ajax_load('index_page_load', document.body, function(response){
            parent.loaded.pages += 1;
        })){
            window.location(NOSCRIPT_DOMAIN);
        }
        
        // OPTIMIZATION: Preload needed page into cache
        var page = (window.location + "").replace('#','')
        if (window.location.pathname === '/')
            page = page + 'home';
            
        if (!parent.ajax_load(page + "_page_load", null, function(response){
            var div = document.createElement('div');
            div.id = window.location.pathname.replace('/','').replace('#','') + "_cache";
            div.style.display = 'none';
            div.innerHTML = response
            document.body.appendChild(div);
            
            parent.loaded.pages += 1;
        })){
            window.location(NOSCRIPT_DOMAIN);
        }
    },
    
    // Loads the given contents of the page into the given element and then calls the callback, with the
    // retrieved data. This uses a GET request.
    ajax_load: function (page, element, callback){
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
        
        // on complete load page into the element then call the callback with the retreived data
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
            requester.open("GET", page, true);
            requester.onreadystatechange = handler;
            requester.send();
        }
        
        return true;
    }
}.init(true);

// event loop to check when everything is loaded, once loaded evaluate the js and start the system
(function loaded(){
    if (Selector.is_system_loaded())
        Selector.start_system();
    else
        setTimeout(loaded, 50);
})();