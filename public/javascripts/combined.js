/**
 * All files combined to eliminate IE errors
 */

// modified from http://javascript.crockford.com/prototypal.html
if (typeof Object.nu !== 'function') {
    Object.nu = function (o) {
        function F() {};
        F.prototype = o;
        return new F();
    };
} else { throw("Object.nu is already defined"); }

utility = {
    SHOW: '-',
    HIDE: '+',
    
    // (psuedo-function)
    // Cycles through each element retrieved by collapse_with attaching the specified action to an event. When this event is
    // triggered the id of the current object is found and put in behind the collapse_to selector. If delay is sent the function
    // is only initialized for later use.
    attach_show_events: function(params){
        var attacher = {
            // Initializes all arguments then starts execution, finally returning its parent object.
            init: function(delay){
                this.triggers = params["triggers"];
                this.event = params["event"];
                this.collapsers = params["collapsers"];
                this.on_hide = params["on_hide"];
                this.on_show = params["on_show"];
                this.chk_attr = "name";
                if (params["chk_attr"]) this.chk_attr = params["chk_attr"];
                
                if (!delay) this.attach_events();
				return this;
            },
            
            // Attach each trigger to its corresponding collapser if it has a corresponding collapser. Keeps on trying
            // to find a collapser by looking ahead.
            attach_events: function(){
                this.order_matchers_by_name();
                
                // length must be the same so no point in checking triggers length
                for(var t = 0, c = 0; t < this.triggers.length && c < this.triggers.length; c++){
                    if($(this.triggers[t]).attr(this.chk_attr) == $(this.collapsers[c]).attr(this.chk_attr)) {
                        this.triggers[t].collapser = this.collapsers[c];
                        $(this.triggers[t])[this.event]($.proxy(this.on_event, this));
                        t += 1;
                    }
                }
            },
            
            // call the on_hide/show events when appropriate passes in the trigger and event that is to be hidden.
            on_event: function(element){
                var trigger = element.currentTarget
                if ($(trigger.collapser).css('display') == 'none')
                    this.on_show(trigger, trigger.collapser);
                else
                    this.on_hide(trigger, trigger.collapser);
            },
            
            // does an on_show/on_hide event with the current element
            open: function(index){
                this.do_event("on_show", index);
                return this
            },
            close: function(index){
                this.do_event("on_hide", index);
                return this;
            },
            do_event: function(event, index){
                if (index == "all") {
                    for(var t = 0;t < this.triggers.length; t++)
                        this[event](this.triggers[t], this.triggers[t].collapser);
                }
                else
                    this[event](this.triggers[index], this.triggers[index].collapser);
            },
            
            // orders set of collapsers and orderers by id
            order_matchers_by_name: function(){
                if (!this.triggers || !this.triggers.sort) return false;
                if (!this.collapsers || !this.collapsers.sort) return false;
                
                // I assume they are the same length for this algorithm to work
                if (this.triggers.length != this.collapsers.length) throw('triggers must be the same length as collapsers');
                
                var parent = this;
                var sorter = function(a, b){
                    if ($(a).attr(parent.chk_attr) > $(b).attr(parent.chk_attr)) return 1;
                    if ($(a).attr(parent.chk_attr) < $(b).attr(parent.chk_attr)) return -1;
                    return 0;
                }
                
                this.triggers.sort(sorter);
                this.collapsers.sort(sorter);
                
                return true;
            },
            
            // Gets the item to collapse by getting the id of the collapser and combining it
            // with the collapse_to selector. 
            get_collapsee :function(collapser){
                var id = collapser.id.split('_').pop();
                return $('#'+this.collapse_to+id);
            }
        }
        
        return Object.nu(attacher.init(params["delay"]));
    }
}

/*Main*/
var LOCATION = (window.location.hostname);
jQuery(document).ready(function() {
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
    map_imgs['http://'+LOCATION+map_srcs[0]] =  function () {tiles.trigger_open(0)};
    map_imgs['http://'+LOCATION+map_srcs[1]] =  function () {tiles.trigger_open(1)};
    map_imgs['http://'+LOCATION+map_srcs[2]] =  function () {tiles.trigger_open(2)};
    map_imgs['http://'+LOCATION+map_srcs[3]] =  function () {tiles.trigger_open(3)};
    map_imgs['http://'+LOCATION+map_srcs[4]] =  function () {tiles.trigger_open(4)};

    var icbm = $(document.body).icbm({
        map_imgs: map_imgs,
        z_index: 3
    });
	
	// determine window to open from page address
	switch(window.location.pathname.replace('/','')) {
		case "home": 		icbm.set_open(0); break;
		case "skills": 		icbm.set_open(1); break;
		case "experience": 	icbm.set_open(2); break;
		case "demos": 		icbm.set_open(3); break;
		case "blog": 		icbm.set_open(4); break;
		default: 			icbm.set_open(0); break;
	}
});

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

/***SKILLS***/
var skills_ns = (function skills_ns() {    
    return {
		init: function(){
			
			// Make each skill section openable, opening the first by default
			var parent = this;
			var main_skills = utility.attach_show_events({
				triggers: $('div[id^=skills_collapse_skill]:visible'),
				event: "click",
				collapsers: $('div[id^=collapse_points_skill]:visible'),
				delay: false,
				on_show: function(trigger, collapser){
					$(collapser).show();
					$('#skills_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = utility.SHOW;
				},
				on_hide: function(trigger, collapser){
					$(collapser).hide();
					$('#skills_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = utility.HIDE;
				}
			});
			
			// Make each part of each skill section openable
			var skill_sections = constant.page_text.skills.skill_types;
			for (var i = 0; i < skill_sections.length; i++){
				utility.attach_show_events({
					triggers: $('button[id^=skills_point_collapse_skill_'+i+']:visible'),
					event: "click",
					collapsers: $('div[id^=collapse_point_points_skill_'+i+']:visible'),
					delay: false,
					parent: this,
					on_show: function(trigger, collapser){
						$(collapser).show();
						trigger.innerHTML =  utility.SHOW;
					},
					on_hide: function(trigger, collapser){
						$(collapser).hide();
						trigger.innerHTML =  utility.HIDE;
					}
				}).close("all");
			}
			
			// Can only each skill section after the inner contents have been modified
			main_skills.close("all").open(0);
		}
    }
})();

/***EXPERIENCE***/
exp_ns = (function () {
    var jobs;
    
    return {
        
       init: function (){
	    // get jobs that are visible and have corresponding details
	    var jobs = $('.job:visible');
	    for (var i = 0; i < jobs.length; i++){
			if(!$('#job'+i+'jobText')[0]){
				jobs.splice(i, 1);
				i--;// compensate for new length
			}
	    }
	
	    utility.attach_show_events({
				triggers: jobs,
				event: "click",
				collapsers: $('.jobText:visible'),
				delay: false,
				on_show: function(trigger, collapser){
					$(collapser).show();
					$('#job' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.SHOW;
				},
				on_hide: function(trigger, collapser){
					$(collapser).hide();
					$('#job' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.HIDE;
				}
			}).close("all").open(0);
       }
    }
})();

/*** DEMOS ***/
demos_ns = (function () {
    var demos = [];// of type Movable eventually
    var newImage;
    var newBg;
    var newClose;
    var polling = false;
    
    return {
        init: function (){
			utility.attach_show_events({
			triggers: $('div[id^="demo_"]:visible'),
			event: "click",
			collapsers: $('div[id^="demolinks_"]:visible'),
			delay: false,
			on_show: function(trigger, collapser){
				$(collapser).show();
				$('#demo' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.SHOW;
			},
			on_hide: function(trigger, collapser){
				$(collapser).hide();
				$('#demo' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.HIDE;
			}
			}).close("all").open(0);
        },
        
        /**
         * demoFunc.js
         */
		
        resize_img: function(image){
			var large_image = $("<img/>").attr('src', image.src.replace('_s','')).attr('id', image.id + "_clone").attr('class', 'viewImage');
			large_image.lightbox_me({destroyOnClose: true, centered: true, overlaySpeed: 0, lightboxSpeed: 300});//not going to chain that would get ugly
			large_image.click(function(){ $(this).trigger('close'); });
		},
        
        /**
         * Remove the enlarged image and background from the screen
         */
        remove_resize: function (newImage){
            document.body.removeChild(newImage);
            document.body.removeChild(newBg);
            document.body.removeChild(newClose);
        },
        
        /**
         * Displays flash video in center of screen
         */
        display_flash: function (location){
            if (location == null)
                window.location = "video.html";
            else
                window.location = location;
        }
    }
})();

/*** BLOG ***/
blog_ns = (function () {
var blog1 = new Array();//of type Movable
var quickMenuB;

    return {
        
        init: function (){
            this.blog_events();
        },
        
        blog_events: function (){
            $('#quickChooseBtn').click($.proxy(function() {
                this.open_quick_c();
            }, this));
        },
        
        /**
         * Toggles if a blog is displayed or not, given an id.
         */
        toggle_blog: function (id){	
            switch(id.charAt(4)){
                case "1": blog1.displayObject(id); break;
                default: alert("error no second blog page");
            }
        },
        
        display_month: function(date){
            var monthTitle = $('#bTitleWrapper')[0];
            var monthText = $('#bTextWrapper')[0];
            
            monthTitle.innerHTML = "<h1>Jacob Friesen's Blog: " + date.replace("_"," ") + "</h1>";
            monthText.innerHTML = readFile("blog/" + date + ".html");
            blog1.closeDisplays(0);
        },
        
        open_quick_c: function(){
            if(quickMenuB.style.display == "none")
				quickMenuB.style.display = "inline";
            else
				quickMenuB.style.display = "none";
        }
    }

})();

/*
 * Utilities
 */
//Put a movable item in front (except in front of the menu)
function putInFront(element)
{
    if(element != null){
		if(element.style.zIndex > 998)
			subOrderings();
		maxZIndex++;
		element.style.position = "absolute";
		element.style.zIndex = maxZIndex;
		maxZIndex++;
		$('#rolloutMenu').css('zIndex', maxZIndex);
    }
}

function toNum(pxValue){
    return Number(pxValue.slice(0,pxValue.length - 2));
}
