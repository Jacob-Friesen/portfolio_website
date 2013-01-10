(function($){
    // Handles all functions with the menu including window opening.
	jQuery.fn.window_tiles = function window_tiles(options){
        //merge options with default settings
		this.settings = {
            after: []
	    };
		if(options)
	        $.extend(this.settings, options);
        
        // contains list of tile objects to manipulate
        this.tile_list = [];
		
		// where each page is loaded into
		this.PAGE_INTO = 'window';
        
        // Unless specified gives all tiles click handlers that open the corresponding button
        // in the tile.
        this.set_tiles = function set_tiles() {
            // Note buttons are synced with top menu via using number only
            $('#icon_based_menu').find('img').each($.proxy(function(index, element) {
                // Passing this class in so a specific tile can be refereshed later when a window is closed
                this.tile_list.push(Window_Tile(element, index, this.settings.after[index], this));
            }, this));
        }
        
        // Opens the given item along with associated functions then updates page address.
        this.open_item = function(index){
            this.tile_list[index].open_obj();
			pages.update_url(index);
			
            this.extra(index, true);
        }
        
        /**
         * Then eliminates/creates any buttons in other tiles that could generate
         * the given tile.
         **/
        this.extra = function(index, opens) {
            var display = 'none';
            if (opens == false){
                display = 'inline';
            }
            
            $('.tile_menu_cent').each(function (i, element){
                $(element).children()[index].style.display = display;
            });
        }
        
        this.set_tiles();
        
        //allow for chaining
        return this;
    };
    
    // CLASS: Window_Tile
    // Handles a specific object in a window tile. Specifically deals with loading.
	Window_Tile = function(item, item_num, exec_after, tiles){
        return {
            OPEN_TITLE: 'Open...',
            FILE_TYPE: '_page_load',
            ITEM_NUM: item_num,
            
            close_btn: null,
            child: null,
            
            item_id: item.id,
            into: $('#' + tiles.PAGE_INTO),
            into_html: null,// Original HTML for the parent
            into_old_xy: [null,null],
            
            tiles: tiles,// Used so that a item can refresh a tile that it used to be in (it will no longer exist after)
            exec_after: exec_after,
            
            // Given a id and object, retrieves the page and displays the object. After that
            // executes the exec_after function. First checks if page is in cache if not loads
            // the page.
            open_obj: function (){
				var cached = $('#' + this.item_id + '_cache');
				if (cached[0] == null)
					$.ajax({
						url: this.item_id + this.FILE_TYPE,
						context: this,
						
						// Displays object in parent then resizes the parent
						success: this.render_child
					});
				else
					this.render_child(cached[0].innerHTML, true);
            },
			
			// Loads page into window section
			render_child: function(file_str, is_cached){
				// Cache element if not already cached
				if (is_cached != true)
					$(document.body).append($('<div id="' + this.item_id + '_cache" style="display: none">' + file_str +'</div>'));
				
				// Display object must unhide it (hidden when in cache)
				this.into[0].innerHTML = file_str;
				this.child = this.into.children(":first")[0];
				this.child.style.display = "inline";
				
				// Resize parent (+2 for making border visible)
				$(this.into).height($(this.child).height() + 2);
				$(this.into).width($(this.child).width());
				
				// Give parent handler to child so it updates the parent
				$(this.child).watch('height, width',function(data, i){
					$(this.parentNode).height($(this).height() + 2);
					$(this.parentNode).width($(this).width());
				});
				if (navigator.appName == 'Microsoft Internet Explorer')
					this.IE_Listen();
				
			   this.adtnl_work(this.child);
			},
			
			// Sets the child to detect a property change. When detected the child gets its height from
			// its childrens combined total. Then uses this height to set its parent. This is then a looping
			// process done every CHECK seconds
			IE_Listen: function (){
				this.child.onpropertychange = function (){
					CHECK = 50;
					
					//get the real height
					this.height = 0;
					$(this).children().each($.proxy(function (i, element){
						this.height += $(element).height();
					}, this));
					
					// Set the height and width, give the height a little padding to make sure
					$(this.parentNode).height(this.height + 45);
					$(this.parentNode).width($(this).width());
					
					// Keep scope and start watching via polling
					var parent = this;// keep scope
					setTimeout(function () {
						parent.fireEvent('onpropertychange', document.createEventObject())
					}, CHECK);
				};
			},
            
            
            // Does extra work that happens with each tile, namely:
            // -Makes sure window container is properly positioned by updating it with its immediate childs width
            // -Runs the exec_after function
            adtnl_work: function(child){
                // Adjust horizontal positioning
                $(child.parentNode.parentNode).width($(child.parentNode).width());
                
                // Execute function specified to execute after load, only if not closing the window currently
                if (this.exec_after == null)
                    throw 'Error: exec_after must be specified';
                else
                    this.exec_after();
            },
            
            // Closes the current object
            close_obj: function (){
               this.close_btn.click();
            }
        }
    };
})(jQuery);
