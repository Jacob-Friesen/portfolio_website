/**
 * Creates an object when initialized creates a menu.
 */

(function($){
	/**
	 * Given an object attach a menu that contains a mapping between name/images and actions. This is the
	 * constructor of the object (If you want to use it as an object).
	 *
	 * z-index: What level the item is on the item specified to add to is. Default is 1.
	 */
	jQuery.fn.icbm = function icbm(options){
		
		
		//Initial non settings values
		this.REPLACE = '_grey';
		this.menu_objs = []
		
		/*
		* Modifies a css value in the current scope to open when clicked and color on mousover
		* */
		this.add_mitems = function add_mitems(map_imgs){
			var REPLACE = this.REPLACE;// So can maintain scope in sub scope
			var menu_objs = [];

			$('.icbm_object').each(function(){
				this.opened = false;
				var img = $(this).find(".icbm_image")[0];
				var old_src = img.src.replace('http://'+window.location.hostname+'/','');
				
				// Replaces grayscale image with non gray scale image
				this.remove_gscale = function (img){
					var t_img = $(img);
					t_img.attr('src', t_img.attr('src').replace(REPLACE,'') + '#');
				}

				$(this).mouseover($.proxy(function(e) {
					this.remove_gscale(img);// sending in img so Function.call(this) doesn't have to be used
				}, this));
				
				$(this).mouseout(function(e) {
					if (this.opened == false)
						img.src = old_src;
				});
				
				$(this).click($.proxy(function(e) {
					try{
						map_imgs[old_src]();
					} catch (e){
						map_imgs['http://'+LOCATION+"/"+old_src]();
					}
				}, this));
				
				//Make sure all dom objects are accessable later
				menu_objs.push(this);
			});
			this.menu_objs = menu_objs;
		};
		
		// Sets an object to open and then colors it
		this.set_open = function set_open(index){
			//this.menu_objs[index].remove_gscale($(this).find(".icbm_image")[0]);
			$(this.menu_objs[index]).click();
		}
		
		/*Constructor Main (Well, the closest thing to it atleast)*/
		
		//merge options with default settings
		this.settings = {
			map_imgs : {},
			z_index: 1
	    };
		if(options)
	        $.extend(this.settings, options);
		
		//Set the zindex
		$('#icon_based_bg').css('z-index', this.settings.z_index + '');
		$('#icon_based_menu').css('z-index', this.settings.z_index + '');
		
		// Add all the default items
		this.add_mitems(this.settings.map_imgs);
		
		return this;
	};
})(jQuery);
