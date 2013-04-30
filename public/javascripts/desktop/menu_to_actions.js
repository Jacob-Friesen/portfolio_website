(function($, page_names){
	
	// Given the menu handler attach a mapping between name/images and actions.
	//
	// after_opening: Function executes after any page is opened.
	// map_imgs: Image url to action mappings.
	// menu_image_at: The dom class that contains an image for a menu item.
	$.fn.menu_to_actions = function (options){
		var main = this;
		this.REPLACE = '_grey';// Word to replace on the images src (to make them reload a color one)
		this.CACHE = 'cached_';
		this.menu_objects = [];
		
		// Merge options with default settings
		this.settings = {
			after_opening: null,
			map_imgs : {},
			menu_image_at: null
	    };
		if(options)
	        $.extend(this.settings, options);
		
		// Assigns each menu item 
		this.add_menu_items = function (map_imgs, menu_image_at, after_opening){
			var parent = this;

			// Each menu object will get colored when moused over and perform the image mapping action when clicked
			this.each(function(element_index){
				var _this = this;
				this.opened = false;
				this.img = $(this).find(menu_image_at)[0];
				var old_src = this.img.src.replace('http://'+window.location.hostname+'/','');
				
				// Sets gray scale depending upon value sent in
				this.set_gscale = function (to_grey){
					var img = $(_this.img);
					var image_name = img.attr('src').split('/').pop();
					
					// Convert the image to its desired color if not already in it
					if (to_grey){
						var src = img.attr('src');
						if (src.search(parent.REPLACE) == -1){
							set_from_cache.call(this, parent.REPLACE);
							this.opened = false;
						}
					}
					else {
						set_from_cache.call(this, '');
					}
					
					function set_from_cache(extra){
						var cached = $('#' + parent.CACHE + image_name.split('_').shift() + extra).clone(true, true);
							cached[0].style.display = 'inline';
							cached[0].id = cached[0].id.replace(parent.CACHE, '') + extra;
						img.replaceWith(cached);
						this.img = cached;
					}
				}
				
				// Make image colored
				$(this).mouseenter(function(e) {
					_this.set_gscale(false);
				});
				
				// Decolor image if not open. Mouseleave or even mouse out sometimes does not fire if the mouse is moved fast enough over the menu
				// icons, so use a parent mouseleave as a backup.
				$(this).parent().mouseleave(function(e) {
					decolor();
				});
				$(this).mouseleave(function(e) {
					decolor();
				});
				function decolor(){
					if (_this.opened === false)
						_this.set_gscale(true);
				}
				
				// Make clicked on menu item colored and triggers the corresponding action sending in the image to the action. Finally, call the after
				// opening callback with the page name.
				// Note: Chrome has some kind of problem with click events on parents not getting bubbled events of replaced children, strangely it
				// only works for mouseup.
				$(this).mouseup(function(){ this.open(); });
				this.open = function(index){
					parent.all_to_grey();
					
					try{
						map_imgs[old_src](this.img);
					} catch (e){
						map_imgs['http://'+Portfolio.location+"/"+old_src](this.img);
					}
					
					this.set_gscale(false);
					this.opened = true;
					
					index = (!index) ? element_index : index;
					var send = (index >= page_names.length) ? '' : page_names[index].toLowerCase();
					after_opening(send);
				};

				// Make sure all dom objects are accessable later
				parent.menu_objects.push(this);
			});
		};
		
		// Greys out all menu items
		this.all_to_grey = function (){
			for (var i = 0; i < this.menu_objects.length; i++)
				this.menu_objects[i].set_gscale(true);
		};
		
		// Sets an object to open and then colors it. Passes in a the sent in index.
		this.set_open = function (index){
			var original = index;
			index = (index >= page_names.length) ? 0 : index;
			$(main.menu_objects[index])[0].open(original);
		};
		
		// Add all the default items
		this.add_menu_items(this.settings.map_imgs, this.settings.menu_image_at, this.settings.after_opening);
		
		return this;
	};
})(jQuery, Portfolio.constants.pages);
