// Handles all the details of loading a page into a window
Portfolio.window_details = (function($, Selector, pages, _navigator){
	
	// Deals with loading a window in and making sure it displays right, caches too.
	var Window = function(item, exec_after, tiles){
        return {
            child: null,
            item_id: $(item).attr('id').split('_').shift(),
            into: $('#' + tiles.PAGE_INTO),
            
            // Given an id and object, retrieves the page and displays the object. After that executes the exec_after function. First checks if page
			// is in cache and if not loads the page.
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
			var src = $(img).attr('src');
			
			if (!this.menu_list[src])
				this.menu_list[src] = Window(img, exec_after, this);
			this.menu_list[src].open_obj();
			
			var page_name = src.split('/').pop().split('_')[0];
			
			return this;// Chaining
		}
    };
})(jQuery, Portfolio.selector, Portfolio.pages, navigator);
