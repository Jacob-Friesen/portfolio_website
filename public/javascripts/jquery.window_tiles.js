(function($){
    /**
    * Handles all functions with the menu including window opening.
    */
	jQuery.fn.window_tiles = function window_tiles(options){
        //merge options with default settings
		this.settings = {
            after: []
	    };
		if(options)
	        $.extend(this.settings, options);
        
        // constants, located here so they can't be overridden
        var NUM_OF_TILES = 2;
        this.tile_list = [];
        
        /**
         * Loops through all menu items making them pass to the display handler on click, unless
         * a specific tile is supposed to be reloaded.
         */
        this.init_menu = function () {
            //loop through all menu items giving them all a display handler
            for (var i = 0; i < NUM_OF_TILES; i++)
                this.set_tiles(i);
        };
        
        /**
         * Unless specified gives all tiles click handlers that open the corresponding button
         * in the tile.
         */
        this.set_tiles = function set_tiles(i) {
            this.tile_list[i] = [];
            
            // Note buttons are synced with side menu via using number only
            $('#tile_menu_cent' + i + ' > button').each($.proxy(function(index, element) {
                // Passing this class in so a specific tile can be refereshed later when a window is closed
                this.tile_list[i].push(Window_Tile(element, i, index, this.settings.after[index], this));
                
                // This is an unchecked open note that the menu item was previously removed so
                // duplicates are still not allowed.
                var cur_length = this.tile_list[i].length;
                $(element).click($.proxy(function(element) {
                    this.open_item(i, cur_length - 1);
                    
                }, this));
                
            }, this));
        }
        
        /**
         * If current window is not already open finds the next open tile if none
         * are open opens in the first then reopens next set of tiles.
         */
        this.trigger_open = function(item){
            var index = this.is_open(item);
            if (index == -1){
                // find next available to open window in
                for (var i = 0; i < this.tile_list.length; i++){
                    var found_item = false;
                    
                    // See if any objects fill the given tile
                    for (var i2 = 0; i2 < this.tile_list[i].length && found_item == false; i2++){
                        if (this.tile_list[i][i2].close_btn != null)
                            found_item = true;
                    }

                    // No objects found for tile so can now insert OR
                    // No empty spaces in any tile, so insert at the front and move all objects left
                    if (i == this.tile_list.length - 1 || found_item == false){
                        var to_insert = item;
                        for (var i2 = 0; i2 < this.tile_list.length; i2++){
                            if (this.tile_list[i2][to_insert]){
                                var del_index = this.close_tile(i2);
                                this.open_item(i2, to_insert);
                            }
                            to_insert = del_index;
                        }
                        break;
                    }
                }
            }
			// Swap places if first item was in second spot
			else if (index > 0){
				var closed = this.close_tile(0);
				this.close_tile(1);
				
				// first page must be the one that updates the address bar
				this.open_item(1, closed);
				this.open_item(0, item);
			}

        }
        
        /**
         * Checks if a given object is open or not. Returns as soon as it
         * finds an open item of the specified type. Returns with a index
         * if a item was found or none if none was found.
         **/
        this.is_open = function(item) {
            for (var i = 0; i < this.tile_list.length; i++){
                if (this.tile_list[i][item] && this.tile_list[i][item].close_btn != null)
                    return i;
            }
            
            return -1;
        }
        
        /**
         * Given a tile number close whatever content is in there, return index of what was
         * closed so if needed it can be opened elsewhere.
         */
        this.close_tile = function (index){
            for (var i = 0; i < this.tile_list[index].length; i++){
                if (this.tile_list[index][i].close_btn != null) {
                    this.close_item(index, i);
                    return i;
                }
            }
            return -1;
        }
        
        /**
         * Closes the given item along with associated functions.
         **/
        this.close_item = function(tile, index){
            this.tile_list[tile][index].close_obj();
            this.extra(index, false);
        }
        
        /**
         * Opens the given item along with associated functions. Updates address if opening
         * the first tile.
         **/
        this.open_item = function(tile, index){
            this.tile_list[tile][index].open_obj();
			if (tile == 0)
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
        
        this.init_menu();
        
        //allow for chaining
        return this;
    };
    
    /**
     * CLASS: Window_Tile
     * Handles a specific object in a window tile. Specifically deals with loading.
     * NOTE: Need to replace Class.create(function(g,d,b,c,e) with Class.create(function Window_Tile(g,d,b,c,e)
     **/
    Class.create(function Window_Tile(item, tile_num, item_num, exec_after, tiles){
        return {
            OPEN_TITLE: 'Open...',
            FILE_TYPE: '_page_load',
            TILE_NUM: tile_num,
            ITEM_NUM: item_num,
            
            close_btn: null,
            child: null,
            
            item_id: item.id.replace('Btn',''),
            into: item.parentNode.parentNode.parentNode,
            into_html: null,// Original HTML for the parent
            into_old_xy: [null,null],
            
            tiles: tiles,// Used so that a item can refresh a tile that it used to be in (it will no longer exist after)
            exec_after: exec_after,
            
            /**
            * Given a id and object, retrieves the page and displays the object. After that
            * executes the exec_after function. First checks if page is in cache if not loads
            * the page.
            **/
            open_obj: function (){
				var cached = $('#' + this.item_id);
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
			
			render_child: function(file_str, is_cached){
				// cache element if not already cached
				if (is_cached != true)
					$(document.body).append($('<div id="' + this.item_id + '" style="display: none">' + file_str +'</div>'));

				
				// remember parent so it can be restored later
				if (this.into_html == null){
					this.into_html = this.into.innerHTML;
					this.into_old_xy = [$(this.into).height(), $(this.into).width()];
				}
				
				// display object
				this.into.innerHTML = file_str;
				this.child = $(this.into).children(":first")[0];
				this.child.style.display = "inline";
				
				// resize parent (+2 for making border visible)
				$(this.into).height($(this.child).height() + 2);
				$(this.into).width($(this.child).width());
				
				// Give parent handler to child so it updates the parent
				$(this.child).watch('height, width',function(data, i){
					$(this.parentNode).height($(this).height() + 2);
					$(this.parentNode).width($(this).width());
				});
				if (navigator.appName == 'Microsoft Internet Explorer')
					this.IE_Listen();
				
				// get the close button
				this.close_btn = $(this.child).find('#closeBtn');
				if (this.close_btn == null)
					throw "could not find close button for: " + this.item_id;
				
				$(this.child).find('#closeBtn').click($.proxy(function (){
					this.close_btn = null;
					
					// resize parent according to old dimensions and reset its html
					$(this.child.parentNode).height(this.into_old_xy[0])
					$(this.child.parentNode).width(this.into_old_xy[1])
					this.child.parentNode.innerHTML = this.into_html;
					
					// rerun init_menu only with the current container
					this.tiles.set_tiles(this.TILE_NUM);

					// must get the child again (as it has changed) and then do additional work
					this.adtnl_work($(this.into).children(":first")[0]);
					
					// make the button visible again
					this.tiles.extra(this.ITEM_NUM, false);
				}, this));
				
			   this.adtnl_work(this.child);
			},
			
			/**
			 * Sets the child to detect a property change. When detected the child gets its height from
			 * its childrens combined total. Then uses this height to set its parent. This is then a looping
			 * process done every CHECK seconds
			 **/
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
					
					// keep scope and start watching via polling
					var parent = this;// keep scope
					setTimeout(function () {
						parent.fireEvent('onpropertychange', document.createEventObject())
					}, CHECK);
				};
			},
            
            /**
             * Does extra work that happens with each tile, namely:
             * -Makes sure window container is properly positioned by updating it with its immediate childs width
             * -Adds/Removes open on top depending upon if closing or opening a window
             * -Runs the exec_after function
             */
            adtnl_work: function(child){
                var is_open = false;
                
                //Adjust horizontal positioning
                $(child.parentNode.parentNode).width($(child.parentNode).width());
                
                // Remove/add open
                var title = $("#panel_title" + this.TILE_NUM)[0];
                if (title.innerHTML == this.OPEN_TITLE){
                    title.innerHTML = "";
                    is_open = true;
                }
                else{
                    title.innerHTML = this.OPEN_TITLE;
                }
                
                // Resize window_set if the containers combined widths exceed it (for now static)
                this.resize_ws();
                
                // Execute function specified to execute after load, only if not closing the window currently
                if (this.exec_after == null)
                    throw 'Error: exec_after must be specified';
                if (is_open == true)
                    this.exec_after();
            },
            
            /**
             * If the "window set" width is smaller than both containers + 5% then resize it to that
             * new size.
             **/
            resize_ws: function() {
                var win_div = $('#window_set');
                var con_1 = $('#window_container0');
                var con_2 = $('#window_container1');
                var comb_width = con_1.width() + con_2.width() + win_div.width() * 0.05;// 5% due to window_container1 margin of 5%
                if (comb_width > win_div.width())
                    win_div.width(comb_width * 1.05);
            },
            
            // closes the current object
            close_obj: function (){
               this.close_btn.click();
            }
        }
    }, this);
})(jQuery);
