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
