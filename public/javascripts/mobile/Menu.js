// Maintains menu state, such as opening and closing
var menu = {
    EVENT: "mouseenter",
    LINK_NAME: "_link",
    title: null,
    page_text: null,
    cur_page: null,
    
    // Attaches EVENT to all menu items so that they are opened when that event is called.
    // NOTE: Maybe causes an IE error with the for in, make sure to check...
    init: function(pages, page_text){
        this.page_text = page_text;
        
        // leaving out a .length property existence check is intentional
        if (pages == null || pages.length < 1) throw('Error pages sent in is null');
        this.attach_page_events(pages);
    },
    
    attach_page_events: function(pages){
        for (var page = 0; page < pages.length; page++){
            var _page = pages[page].toLowerCase();
            if(_page.split('exp').length > 1) _page = "experience";
            
            $("#" + _page + this.LINK_NAME)[this.EVENT]( $.proxy(this.open_link, this, _page) );
        }
    },
    
    // Using the sent in link ,or page if no link was provided, loads the page.
    open_link: function(page){
        system.load_page(page, {}, $.proxy(this.new_page, this, page));
    },
    
    // Load the link and put up page address in address bar and add title. Then run page initializations.
    new_page: function(page){
        // Update the address and add a title
        if (window.history.pushState)
            window.history.pushState(this.page_text[page].title + page + " page", this.page_text[page].title, '/' + page);
        else
            window.location.href = window.location.href.split('#')[0] + '#' + page;
        document.title = this.page_text[page].title;
            
        system.page_init(page);
    }
};
