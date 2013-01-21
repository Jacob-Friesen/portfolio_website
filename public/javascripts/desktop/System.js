// NOTE: All files must eventually be combined to eliminate IE errors
LOCATION = (window.location.hostname);

// loads up the system using the address bar to load the correct page
start_system = function (){
    //removeFromPlacers();
    
    // make each window menu, specifying what to execute after
    var tiles = $().window_tiles({after:
        [
            function () {pages.init_home()},
            function () {pages.init_skills()},
            function () {pages.init_exp()},
            function () {pages.init_demos()},
            function () {pages.init_blog()}  
        ]
    });
    
    // make main menu
    if (window.location.port != "") LOCATION += ":" + window.location.port;
	
    var map_imgs = {}
    var map_srcs = [
		'/images/menu_icons/home_page_grey.png',
		'/images/menu_icons/skills_page_grey.png',
		'/images/menu_icons/experience_page_grey.png',
		'/images/menu_icons/demos_page_grey.png',
		'/images/menu_icons/blog_page_grey.png'
    ]
    map_imgs['http://'+LOCATION+map_srcs[0]] =  function () {tiles.open_item(0)};
    map_imgs['http://'+LOCATION+map_srcs[1]] =  function () {tiles.open_item(1)};
    map_imgs['http://'+LOCATION+map_srcs[2]] =  function () {tiles.open_item(2)};
    map_imgs['http://'+LOCATION+map_srcs[3]] =  function () {tiles.open_item(3)};
    map_imgs['http://'+LOCATION+map_srcs[4]] =  function () {tiles.open_item(4)};

    var icbm = $(document.body).icbm({
        map_imgs: map_imgs
    });
	
	// determine window to open from page address
	switch(window.location.pathname.replace('/','').replace('#','')) {
		case "home": 		icbm.set_open(0); break;
		case "skills": 		icbm.set_open(1); break;
		case "experience": 	icbm.set_open(2); break;
		case "demos": 		icbm.set_open(3); break;
		case "blog": 		icbm.set_open(4); break;
		default: 			icbm.set_open(0); break;
	}
};

 /*
 * Namespace for all functions executed when a specific page loads
 */
var pages = (function () {
    return {
        
        /**
         * This is what every window must run
         */
        defaults: function () {
            $("img").each(function() {
                if ($(this).attr("class") != 'icbm_image' && $(this)[0].id != 'mainImg' && $(this).attr("class") != 'link'){
                    //note the resize listener
                    this.parentNode.addEventListener('mousedown',function (e) {
                    if(e.target.id == 'hMainPicture')
                        demos_ns.resize_img(e.target.childNodes[1]);
                    else
                        demos_ns.resize_img(e.target);
                    },true);
                }
            });
        },
        
        
        // Clears up image of myself
        init_home: function() {
            this.defaults();
            
            //Clear up image of myself
            $(".mainImage").each( function (i, element) {
                $(element).attr("src", $("#mainImg").attr("src").replace('_s',''));
            });
        },
        
        // goes through the skills namespace
        init_skills: function() {
            this.defaults();
            skills_ns.init();
        },
        init_exp: function() {
            this.defaults();  
            exp_ns.init();
        },
        init_demos: function() {
            this.defaults();
            demos_ns.init();
        },
        init_blog: function() {
            this.defaults();  
            blog_ns.init();
        },
		
		// Updates url bar with current page using pushstate or if an older browser use a hash for page updates.
		update_url: function(page_num) {
			// Find page name
			var page = null;
			for (var i = 0; i < constant.pages.length; i++){
				if (i == page_num){
					page = constant.pages[i].toLowerCase();
					break;
				}
			}
			if (!page)
				throw("Error: " + page_num + " was not found in the list of pages.");
			
			// Update the address and add a title
			if (window.history.pushState)
				window.history.pushState(constant.page_text[page].title + page + " page", constant.page_text[page].title, '/' + page);
			else
				window.location.href = window.location.href.split('#')[0] + '#' + page;
			document.title = constant.page_text[page].title;
		}
    }
})();