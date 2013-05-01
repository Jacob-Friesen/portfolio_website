// Implements tracking of user back and forward presses by keeping an application state of user movements. This is only tracked while they are on the
// website, no permanent information is stored.
Portfolio.history_tracking = (function($, pages, page_history){
    var first_run = true;
    var going_back = false;
    
    return {
        init: function(caller, open_window){
            if (typeof caller !== null) pages = caller;
            
            // Whenever the address bar state changes update the application history if the user went back or forward through their history
            History.Adapter.bind(window, 'statechange', function(){
                var State = History.getState();
                var page = State.url.split('/').pop();
                
                if (page_history.is_backward(page)) {
                    var to_page = page_history.go_back(page);
                    going_back = page_history.is_first();
                } else if (page_history.is_forward(page))
                    var to_page = page_history.go_forward();
                
                if (typeof to_page !== 'undefined') open_window.call(pages, to_page);
            });
        },
        
        // Adds the page to history and updates the url if the user isn't going back through their history. Also, the url of the page is not updated
        // on the first page opening
	after_page_loads: function (page_name){
            if (!going_back){
                page_history.add(page_name);
                if (!first_run)
                    pages.update_url.call(pages, page_name);
                first_run = false;
            }
            else
                going_back = false;
	}
    }
})(jQuery, Portfolio.pages, Portfolio.page_history);