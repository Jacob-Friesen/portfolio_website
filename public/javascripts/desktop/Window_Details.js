// Handles all the details of loading a page into a window
Portfolio.window_details = (function($, Selector, pages, _navigator){
	
	// Deals with loading a window in and making sure it displays right, caches too.
	var Window = function(item, exec_after, tiles){
        return {
            child: null,
            item_id: item.id,
            into: $('#' + tiles.PAGE_INTO),
            
            // Given an id and object, retrieves the page and displays the object. After that executes the
			// exec_after function. First checks if page is in cache and if not loads the page.
            open_obj: function(){
				var cached = $('#' + this.item_id + '_cache');
				if (cached[0] == null)
					$.ajax({
						type: 'GET',
						url: this.item_id + Selector.mode_to_get(),
						context: this,
						success: this.render_page
					});
				else
					this.render_page(cached[0].innerHTML, true);
            },
			
			// Loads page data into window section, caches the page if not already cached.
			render_page: function(file_str, is_cached){
				// Cache element if not already cached
				if (is_cached !== true)
					Selector.add_cache(this.item_id, file_str);
				
				// Display object in into
				this.into[0].innerHTML = file_str;
				this.child = this.into.children(":first")[0];
				this.child.style.display = "inline";
				
				// Resize parent (+2 for making border visible)
				$(this.into).height($(this.child).height() + 2);
				$(this.into).width($(this.child).width());
				
				// Give parent handler to child so it updates the parent when height is changed
				$(this.child).watch('height, width',function(data, i){
					$(this.parentNode).height($(this).height() + 2);
					if (_navigator.appName.toLowerCase() === 'microsoft internet explorer')
						$(this.parentNode).height($(this).height() + 15);
					
					$(this.parentNode).width($(this).width());
				});
				if (_navigator.appName.toLowerCase() === 'microsoft internet explorer')
					this.IE_Listen();
				
				this.adtnl_work(this.child);
			},
			
			// Sets the child to detect a property change. When detected the child gets its height from
			// its childrens combined total. Then uses this height to set its parent. This is then a looping
			// process done every CHECK milleseconds
			IE_Listen: function(){
				this.child.onpropertychange = function (){
					CHECK = 50;
					
					//get the real height
					this.height = 0;
					$(this).children().each($.proxy(function (i, element){
						this.height += $(element).height();
					}, this));
					
					// Set the height and width, give the height a little padding to make sure
					$(this.parentNode).height(this.height + 60);
					$(this.parentNode).width($(this).width());
					
					// Keep scope and start watching via polling
					var parent = this;
					setTimeout(function () {
						parent.fireEvent('onpropertychange', document.createEventObject())
					}, CHECK);
				};
			},
            
            
            // Does extra work that happens with each tile, namely:
            // 1. Makes sure window container is properly positioned by updating it with its immediate childs width
            // 2. Runs the exec_after function
            adtnl_work: function(child){
                // Adjust horizontal positioning
                $(child.parentNode.parentNode).width($(child.parentNode).width());
                
                // Execute function specified to execute after load
                if (exec_after === null)
                    throw 'Error: exec_after must be specified';
                exec_after();
            }
        }
    };
	
	return {
		menu_list: {},// Contains object list of menu objects to manipulate
		PAGE_INTO: 'window',// Where each page is loaded into
		
		// Open menu item caches window initialization so it only has to be done once
		open_item: function(img, exec_after){
			if (!this.menu_list[img.src])
				this.menu_list[img.src] = Window(img, exec_after, this);
			this.menu_list[img.src].open_obj();
			
			var page_name = img.src.split('/').pop().split('_')[0];
			Portfolio.pages.update_url(page_name);
			
			return this;// Chaining
		}
    };
})(jQuery, Portfolio.selector, Portfolio.pages, navigator);
