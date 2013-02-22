(function($, _location){
	
	// Given the menu handler attach a mapping between name/images and actions.
	//
	// map_imgs: Image url to action mappings
	// menu_image_at: The dom class that contains an image for a menu item (selector code)
	$.fn.menu_to_actions = function (options){
		this.REPLACE = '_grey';// Word to replace on the images src (to make them reload a color one)
		this.menu_objects = [];
		
		// Merge options with default settings
		this.settings = {
			map_imgs : {},
			menu_image_at: null
	    };
		if(options)
	        $.extend(this.settings, options);
		
		// Assigns each menu item 
		this.add_menu_items = function (map_imgs, menu_image_at){
			var parent = this;

			// Each menu object will get colored when moused over and perform the image mapping action when clicked
			this.each(function(){
				this.opened = false;
				this.img = $(this).find(menu_image_at)[0];
				var old_src = this.img.src.replace('http://'+window.location.hostname+'/','');
				
				// Sets gray scale depending upon value sent in
				this.set_gscale = function (to_grey){
					var img = $(this.img);
					
					// Convert the image to its desired color if not already in it
					if (to_grey){
						var src = img.attr('src');
						
						if(src.search(parent.REPLACE) == -1){
							var src_parts = src.split('.');
							img.attr('src', src_parts[0] + parent.REPLACE + '.' + src_parts[1]);
							
							this.opened = false;
						}
					}
					else
						img.attr('src', img.attr('src').replace(parent.REPLACE,''));
				}
				
				// Make image colored
				$(this).mouseover(function(e) {
					this.set_gscale(false);
				});
				
				// Decolor image if not open
				$(this).mouseout(function(e) {
					if (this.opened === false)
						this.set_gscale(true);
				});
				
				// Make clicked on menu item colored and triggers the corresponding action sending in the image to the action.
				$(this).click(function(e) {
					parent.all_to_grey();

					//try{
						map_imgs[old_src](this.img);
					//} catch (e){
					//	map_imgs['http://'+_location+"/"+old_src](this.img);
					//}
					
					this.set_gscale(false);
					this.opened = true;
				});
				
				// Make sure all dom objects are accessable later
				parent.menu_objects.push(this);
			});
		};
		
		// Greys out all menu items
		this.all_to_grey = function (){
			for (var i = 0; i < this.menu_objects.length; i++)
				this.menu_objects[i].set_gscale(true);
		};
		
		// Sets an object to open and then colors it
		this.set_open = function (index){
			$(this.menu_objects[index]).click();
		};
		
		// Add all the default items
		this.add_menu_items(this.settings.map_imgs, this.settings.menu_image_at);
		
		return this;
	};
})(jQuery, Portfolio.location);
