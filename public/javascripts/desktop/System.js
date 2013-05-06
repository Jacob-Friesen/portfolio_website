Portfolio.location = window.location.hostname;

// Loads up the desktop system using the address bar to load the correct page. Also, sets up address state logging so forward and backs can be handled
Portfolio.start_system = (function (w, $, history_tracking, page_history, pages, tiles, _location){
	// Some variables are only set at the start of system loading
	function reload_variables(){
		history_tracking = Portfolio.history_tracking;
		page_history = Portfolio.page_history;
		pages = Portfolio.pages;
		tiles = Portfolio.window_details;
	}
	
	// Determine window to open now from page address
	var window_opener = null;
	function open_window(path, to_call){
		window_opener = (!window_opener) ? to_call : window_opener;
		
		switch(path) {
			case "home": 		window_opener(0); break;
			case "skills": 		window_opener(1); break;
			case "experience": 	window_opener(2); break;
			case "demos": 		window_opener(3); break;
			case "blog": 		window_opener(4); break;
			case "":			window_opener(5); break;
			default: 			window_opener(0); break;
		}
	}
	
	// Load the system getting the current location and setting up page handlers. Finally, load the page the address bar specifies.
	return function(){
		reload_variables();
		
		if (w.location.port != "") _location += ":" + w.location.port;
		
		// Make surface main menu item handlers
		var map_imgs = {};
		var map_srcs = [
			'/images/menu_icons/home_page_grey.png',
			'/images/menu_icons/skills_page_grey.png',
			'/images/menu_icons/experience_page_grey.png',
			'/images/menu_icons/demos_page_grey.png',
			'/images/menu_icons/blog_page_grey.png'
		];
		map_imgs['http://'+_location+map_srcs[0]] =  function (img) {tiles.open_item(img, pages.init_home)};
		map_imgs['http://'+_location+map_srcs[1]] =  function (img) {tiles.open_item(img, pages.init_skills)};
		map_imgs['http://'+_location+map_srcs[2]] =  function (img) {tiles.open_item(img, pages.init_exp)};
		map_imgs['http://'+_location+map_srcs[3]] =  function (img) {tiles.open_item(img, pages.init_demos)};
		map_imgs['http://'+_location+map_srcs[4]] =  function (img) {tiles.open_item(img, pages.init_blog)};
	
		var icon_menu = $('.icbm_object').menu_to_actions({
			after_opening: function(page_name){ history_tracking.after_page_loads(page_name); },
			map_imgs: map_imgs,
			menu_image_at: '.icbm_image'
		});
		
		history_tracking.init(pages, open_window);
		
		// Get page address and open the window using that address
		if(!w.history.pushState)
			var path = (w.location + "").split("#./").pop().split('?')[0];
		else
			var path = w.location.pathname.replace('/','').replace('#','');
		open_window(path, icon_menu.set_open);
	}
})(window, jQuery, Portfolio.history_tracking, Portfolio.page_history, Portfolio.pages, Portfolio.window_details, Portfolio.location);

// Namespace for all functions executed when a specific page loads
Portfolio.pages = (function ($, w, c, skills, exp, demos, blog, _document) {
	// This is what every window must run
	function defaults() {
		$("img").each(function() {
			if ($(this).attr("class").search('icbm_image') == -1 && $(this)[0].id != 'mainImg' && $(this).attr("class") != 'link'){
                // An inefficient listener (although unnoticeable in this instance), but IE 8 has problems when pages are cached as I am doing
                $(_document).off('mousedown', '#' + this.id);// Caching can result in multiple element copies and I don't want >1 events per object
				$(_document).on('mousedown', '#' + this.id, function (e) {
                    if(e.target.id === 'hMainPicture')
                        demos.resize_img(e.target.childNodes[1]);
                    else
                        demos.resize_img(e.target);
				});
			}
		});
	}
	
    return {
        // Clears up image of myself
        init_home: function() {
            defaults();
            
            $(".mainImage").each( function (i, element) {
                $(element).attr("src", $("#mainImg").attr("src").replace('_s',''));
            });
        },
        
		// I could use metaprogramming here, but it would make the code hard to understand
        init_skills: function() {
            defaults();
            skills.init();
        },
        init_exp: function() {
            defaults();  
            exp.init();
        },
        init_demos: function() {
            defaults();
            demos.init();
        },
        init_blog: function() {
            defaults();  
            blog.init();
        }
    }
})(jQuery, window, Portfolio.constants, Portfolio.skills, Portfolio.experience, Portfolio.demos, Portfolio.blog, window.document);