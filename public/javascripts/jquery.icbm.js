(function($){
	// Given an object attach a menu that contains a mapping between name/images and actions. This is the
	// constructor of the object (If you want to use it as an object).
	//
	// z-index: What level the item is on the item specified to add to is. Default is 1.
	jQuery.fn.icbm = function icbm(options){
		//Initial non settings values
		this.REPLACE = '_grey';
		this.menu_objs = []
		
		// Sets up each menu item in the top menu
		var parent = this;
		this.add_menu_items = function add_mitems(map_imgs){
			var menu_objs = [];

			$('.icbm_object').each(function(){
				this.REPLACE = parent.REPLACE;
				this.opened = false;
				this.img = $(this).find(".icbm_image")[0];
				var old_src = this.img.src.replace('http://'+window.location.hostname+'/','');
				
				// Sets gray scale depending upon value sent in
				this.set_gscale = function (to_grey){
					var img = $(this.img);
					
					// convert the image to its desired form if not already in it
					if (to_grey){
						var src = img.attr('src');
						
						if(src.search(this.REPLACE) == -1){
							src_parts = src.split('.');
							img.attr('src', src_parts[0] + this.REPLACE + '.' + src_parts[1]);
							
							this.opened = false;
						}
					}
					else
						img.attr('src', img.attr('src').replace(this.REPLACE,''));
				}
				
				// make image colored
				$(this).mouseover($.proxy(function(e) {
					this.set_gscale(false);
				}, this));
				
				// decolor image if not open
				$(this).mouseout(function(e) {
					if (this.opened == false)
						this.set_gscale(true);
				});
				
				// Make clicked on menu item colored and open its specified page
				$(this).click($.proxy(function(e) {
					parent.all_to_grey();

					try{
						map_imgs[old_src]();
					} catch (e){
						map_imgs['http://'+LOCATION+"/"+old_src]();
					}
					
					this.set_gscale(false);
					this.opened = true;
				}, this));
				
				//Make sure all dom objects are accessable later
				menu_objs.push(this);
			});
			this.menu_objs = menu_objs;
		};
		
		// Greys out all menu items
		this.all_to_grey = function all_to_grey(){
			for (var i = 0; i < this.menu_objs.length; i++)
				this.menu_objs[i].set_gscale(true);
		};
		
		// Sets an object to open and then colors it
		this.set_open = function set_open(index){
			$(this.menu_objs[index]).click();
		};
		
		//merge options with default settings
		this.settings = {
			map_imgs : {}
	    };
		if(options)
	        $.extend(this.settings, options);
		
		// Add all the default items
		this.add_menu_items(this.settings.map_imgs);
		
		return this;
	};
})(jQuery);
