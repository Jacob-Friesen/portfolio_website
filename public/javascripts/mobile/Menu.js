// Maintains menu state, such as opening and closing
Portfolio.menu = (function($, Selector, _document, _location, history_tracking){
    return {
        EVENT: "mouseenter",
        LINK_NAME: "_link",
        page_text: null,
        loader: null,
        placed: null,
        page_initializer: null,
        cur_page: null,
        
        // Needs a list of page names, their page_text, Object to display loading info, Object to insert page
        // data into, and a page initializer callback used after a page is loaded. Attaches page events to each
        // of the listed pages.
        init: function(pages, page_text, loader, placed, page_initializer){
            this.page_text = page_text;
            this.page_initializer = page_initializer;
            this.loader = loader;
            this.placed = placed;
            this.history_tracking = history_tracking;
            
            // leaving out a .length property existence check is intentional
            if (pages === null || pages.length < 1) throw('Error pages sent in is null');
            this.attach_page_events(pages);
            
            history_tracking.init(this, this.open_link);
        },
        
        // Attach a page opening event to each menu icon, the page name is sent to the loading function via closure
        attach_page_events: function(pages){
            for (var page = 0; page < pages.length; page++){
                var _page = pages[page].toLowerCase();
                if(_page.split('exp').length > 1) _page = "experience";
                
                _page = _page.split('/').pop();// To deal with when #top appears in the address bar
                var real = (_location.split('/').pop() === '' && _page === 'home') ? '' : _page; // Get the original heading name for home
                
                $("#" + _page + this.LINK_NAME)[this.EVENT]( $.proxy(this.open_link, this, real) );
            }
        },
        
        // Caches the current page then loads the sent in page, displaying a loading message. Tracks the opened page.
        open_link: function(page){
            var original = page;
            page = page.split('/').pop();
            page = (page === '') ? 'home' : page;
            
            // cache old page
            if (this.cur_page && this.cur_page !== page)
                Selector.add_cache(this.cur_page, this.placed[0].innerHTML);
            this.cur_page = page;
            
            this.loader[0].innerHTML = "<center>Loading...<center>";
            
            // check if page is in cache, if it is load it instead of doing an AJAX request
            var cached = $('#' + page + '_cache');
            if (cached[0] == null)
                this.placed.load('/' + page + Selector.mode_to_get(), null, $.proxy(this.page_initializer, this, page));
            else {
                this.placed[0].innerHTML = cached[0].innerHTML;
                this.page_initializer(page);
            }
            this.history_tracking.after_page_loads(original);
        }
    }
})(jQuery, Portfolio.selector, window.document, window.location.href, Portfolio.history_tracking);
