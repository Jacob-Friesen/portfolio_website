// Maintains menu state, such as opening and closing
Portfolio.menu = (function($, Selector, _document){
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
            
            // leaving out a .length property existence check is intentional
            if (pages === null || pages.length < 1) throw('Error pages sent in is null');
            this.attach_page_events(pages);
        },
        
        attach_page_events: function(pages){
            for (var page = 0; page < pages.length; page++){
                var _page = pages[page].toLowerCase();
                if(_page.split('exp').length > 1) _page = "experience";
                
                _page = _page.split('/').pop();// To deal with when #top appears in the address bar
                
                $("#" + _page + this.LINK_NAME)[this.EVENT]( $.proxy(this.open_link, this, _page) );
            }
        },
        
        // Caches the current page then loads the sent in page, displaying a loading message.
        open_link: function(page){
            page = page.split('/').pop();

            this.loader[0].innerHTML = "<center>Loading...<center>";
            
            // cache old page
            if (this.cur_page)
                Selector.add_cache(this.cur_page, this.placed[0].innerHTML);
            
            
            // check if page is in cache, if it is load it ainstead of doing an AJAX request
            var cached = $('#' + page + '_cache');
            if (cached[0] == null)
                this.placed.load('/' + page + Selector.mode_to_get(), null, $.proxy(this.new_page, this, page));
            else{
                this.placed[0].innerHTML = cached[0].innerHTML;
                this.new_page(page);
            }
        },
        
        // Load the link and put up page address in address bar and add title. Then run page initializations.
        new_page: function(page){
            // Update the address and add a title
            if (window.history.pushState)
                window.history.pushState(this.page_text[page].title + page + " page", this.page_text[page].title, '/' + page);
            else{
                window.location.href = window.location.href.split('#')[0] + '#' + page;
            }
            _document.title = this.page_text[page].title;
                
            this.page_initializer(page);
        }
    }
})(jQuery, Portfolio.selector, window.document);
