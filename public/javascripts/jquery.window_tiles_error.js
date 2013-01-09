(function($){
    /**
    * Handles all functions with the menu including window opening.
    */
	jQuery.fn.window_tiles = function window_tiles(options){
        //merge options with default settings
		this.settings = {
			tile: null,
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
        this.init_menu = function (tile) {
            if (this.settings.tile != null)
                this.set_tiles(this.settings.tile);
            //loop through all menu items giving them all a display handler
            else{
                for (var i = 0; i < NUM_OF_TILES; i++){
                    this.set_tiles(i);
                }
            }
        };
        
        /**
         * Unless specified gives all tiles click handlers that open the corresponding button
         * in the tile.
         */
        this.set_tiles = function (i) {
            this.tile_list[i] = [];
            
            // Note buttons are synced with side menu via using number only
            $('#tile_menu_cent' + i + ' > button').each($.proxy(function(index, element) {
                this.tile_list[i].push(Window_Tile(element, i, this.settings.after[index]));
                
                // This is an unchecked open note that the menu item was previously removed so
                // duplicates are still not allowed.
                var cur_length = this.tile_list[i].length;
                $(element).click($.proxy(function() {
                    // BUG (SCOPING): needed to add this to settings
                    this.tile_list[i][cur_length - 1].open_obj(this.settings.after[index]);
                }, this));
                
            }, this));
        }
        
        /**
         * If current window is not already open finds the next open tile if none
         * are open opens in the first then reopens next set of tiles.
         */
        this.trigger_open = function(item){
            // find next available to open window in
            for (var i = 0; i < this.tile_list.length; i++){
                var found_item = false;
                
                // See if any objects fill the given tile
                for (var i2 = 0; i2 < this.tile_list[i].length && found_item == false; i2++){
                    if (this.tile_list[i][i2].close_btn != null)
                        found_item = true;
                }
                
                // No objects found for tile so can now insert
                if (found_item == false){
                    this.tile_list[i][item].open_obj(this.settings.after[i]);
                    break;
                }
                // No empty spaces in any tile, so insert at the front and move all objects left
                else if (i == this.tile_list.length - 1){
                    var to_insert = item;
                    for (var i2 = 0; i2 < this.tile_list.length; i2++){
                        var del_index = this.close_tile(i2);
                        this.tile_list[i2][to_insert].open_obj(this.settings.after[to_insert]);
                        to_insert = del_index;
                    }
                }
            }
            
            return true;
        }
        
        /**
         * Given a tile number close whatever content is in there, return index of what was
         * closed so if needed it can be opened elsewhere.
         */
        this.close_tile = function (index){
            for (var i = 0; i < this.tile_list[index].length; i++){
                if (this.tile_list[index][i].close_btn != null) {
                    this.tile_list[index][i].close_obj();
                    return i;
                }
            }
            return -1;
        }
        
        this.init_menu();
        
        //allow for chaining
        return this;
    };
    
    /**
     * CLASS: Window_Tile
     * Handles a specific object in a window tile. Specifically deals with loading.
     **/
    Class.create(function Window_Tile(item, tile_num, exec_after){
        return {
            OPEN_TITLE: 'Open...',
            FILE_TYPE: '.php',
            TILE_NUM: tile_num,
            
            close_btn: null,
            child: null,
            
            item_id: item.id.replace('Btn',''),
            into: item.parentNode.parentNode.parentNode,
            into_html: null,// Original HTML for the parent
            into_old_xy: [null,null],
            
            exec_after: exec_after,
            
            /**
            * Given a id and object, retrieves the page and displays the object. After that
            * executes the exec_after function.
            **/
            open_obj: function (exec_after){
                if (exec_after != null)
                    this.exec_after = exec_after;
                $.ajax({
                    url: this.item_id + this.FILE_TYPE,
                    context:this,
                    
                    // Displays object in parent then resizes the parent
                    success: function(file_str){
                        // remember parent so it can be restored later
                        if (this.into_html == null){
                            this.into_html = this.into.innerHTML;
                            this.into_old_xy = [$(this.into).height(), $(this.into).width()];
                        }
                        
                        // display object
                        this.into.innerHTML = file_str;
                        this.child = $(this.into).children(":first")[0];
                        this.child.style.display = "inline";
                        
                        // resize parent (+2 for making borders visible)
                        $(this.into).height($(this.child).height() + 2);
                        $(this.into).width($(this.child).width());
                        
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
                            $().window_tiles({tile: this.TILE_NUM});

                            // must get the child again (as it has changed) and then do additional work
                            this.adtnl_work($(this.into).children(":first")[0]);
                        }, this));
                        
                       this.adtnl_work(this.child);
                    }
                });
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