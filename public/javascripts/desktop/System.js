Portfolio.location = window.location.hostname;

// Loads up the desktop system using the address bar to load the correct page
Portfolio.start_system = function (){
	var pages = Portfolio.pages,
		tiles = Portfolio.window_details,
		_location = Portfolio.location;
    
    if (window.location.port != "") _location += ":" + window.location.port;
	
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

    var icbm = $('.icbm_object').menu_to_actions({
        map_imgs: map_imgs,
		menu_image_at: '.icbm_image'
    });
	
	//get page address
	if((window.location + "").split('#').length > 1)
		var path = (window.location + "").split('#').pop();
	else
		var path = window.location.pathname.replace('/','').replace('#','')
	
	// Determine window to open now from page address
	switch(path) {
		case "home": 		icbm.set_open(0); break;
		case "skills": 		icbm.set_open(1); break;
		case "experience": 	icbm.set_open(2); break;
		case "demos": 		icbm.set_open(3); break;
		case "blog": 		icbm.set_open(4); break;
		default: 			icbm.set_open(0); break;
	}
};

// Namespace for all functions executed when a specific page loads
Portfolio.pages = (function ($, w, c, skills, exp, demos, blog) {
	// This is what every window must run
	function defaults() {
		$("img").each(function() {
			if ($(this).attr("class") != 'icbm_image' && $(this)[0].id != 'mainImg' && $(this).attr("class") != 'link'){
				//note the resize listener
				this.parentNode.addEventListener('mousedown', function (e) {
				if(e.target.id === 'hMainPicture')
					demos.resize_img(e.target.childNodes[1]);
				else
					demos.resize_img(e.target);
				},true);
			}
		});
	}
	
	// Public
    return {
        // Clears up image of myself
        init_home: function() {
            defaults();
            
            $(".mainImage").each( function (i, element) {
                $(element).attr("src", $("#mainImg").attr("src").replace('_s',''));
            });
        },
        
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
        },
		
		// Updates url bar with current page using pushstate or if an older browser use a hash for page updates.
		update_url: function(page) {			
			// Update the address and add a title
			if (w.history.pushState)
				w.history.pushState(c.page_text[page].title + page + " page", c.page_text[page].title, '/' + page);
			else
				w.location.href = w.location.href.split('#')[0] + '#' + page;
			w.document.title = c.page_text[page].title;
		}
    }
})(jQuery, window, Portfolio.constants, Portfolio.skills, Portfolio.experience, Portfolio.demos, Portfolio.blog);