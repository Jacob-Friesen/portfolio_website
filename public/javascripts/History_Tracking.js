// Implements tracking of user back and forward presses by storing state in history.
Portfolio.history_tracking = (function($, w, pages, history, page_text) {
    var first_run = true;
    var going_back = false;
    var current_page = null;
    
    function convert_page(page){
	return (page === '') ? 'home' : page;
    }
    
    return {
        init: function(caller, open_window){
            // Whenever the address bar state changes check if a new page should be opened. Specifically, if the user is going back or forwards
	    // through their history the current page before address set will be wrong so it should be automatically changed.
            history.Adapter.bind(w, 'statechange', function() {
		var data = History.getState().data;
		
		// Shouldn't be loading the same page again
		if (typeof data.jf_page !== 'undefined' && convert_page(data.jf_page) !== convert_page(current_page) ) {
		    var page = data.jf_page;
		   
		    if (current_page !== null)
			open_window.call(caller, page);
		}
            });
        },
        
        // Updates the url if the user isn't going back through their history. Also, the url of the page is not updated on the first page opening
	after_page_loads: function (page_name) {
	    current_page = page_name;
	    page_name = convert_page(page_name);
	    
	    // Need to update the page state with the current url and extra data on page load but only extra data if the url is correct.
	    if (!first_run)
		this.update_url(current_page, page_name, history.pushState);
	    else
		this.update_url(current_page, page_name, history.replaceState);
		
	    first_run = false;
	},
	
	// Updates url bar or replaces current history state depending upon method with the current page using pushstate (older browsers handled by
	// History.js). Also, tracks the current page in history.
	update_url: function(to_page, page_text_index, method) {
	    method({jf_page: to_page}, page_text[page_text_index].title, '/' + to_page);
	}
    }
})(jQuery, window, Portfolio.pages, History, Portfolio.constants.page_text);