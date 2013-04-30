// Manages moving backwards and forwards through application history
Portfolio.page_history = (function () {
    var current = -1;
    var pages = [];
    
    return {
        // Add the page to the list of pages if the user is at the top of the history (no forward button). If a page is clicked on in the middle of a
        // history chain, put that item in fron of the current and erase the rest of the array. Also, two same page in a row are not added.
        add: function(page){
            if (current + 1 === pages.length && this.get() !== page){
                pages.push(page);
                current += 1;
            // backwards will be one ahead in this case
            } else if (!this.is_forward(page) && page !== this.get()){
                current += 1
                pages.splice(current, 0, page);// No need to remove extra tail elements browser will never reach them
            }
        },
        
        // Get current page, or get current page forward or backwards by the shift
        get: function(shift){
            if (!shift) shift = 0;
            return pages[current + shift];
        },
        
        // Detects if the user is going forwards through application history
        is_forward: function(page){
            return current + 1 < pages.length && page === this.get(1);
        },
        
        // Detects if the user is going backwards through application history
        is_backward: function(page){
            return page === this.get(-1);
        },
        
        // If on the first element in this pages history
        is_first: function(){
            return current === 0;
        },
        
        // Returns last history element and points history one position back. Does not go back before the first
        go_back: function(page){
            current -= 1;
            return this.get();
        },
        
        // Points to the next next history element and returns the next element
        go_forward: function(){
            current += 1;
            return this.get();
        }
    }
})();