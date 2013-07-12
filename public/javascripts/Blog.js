Portfolio.blog = (function ($, selector, utility){
    return {
        init: function (){
            this.load_post();
        },
        
        // Get Latest blog post contents from tumbler and display it under blog, then update the code highlighting
        load_post: function(){
            var parent = this;
            
            $.getJSON('http://obscurejavascript.tumblr.com/api/read/json?callback=?', {}, function(response) {
                // Update regular dom elements and the cached ones
                $('.blogTitle').each(function(){
                    this.innerHTML = response.posts[0]['regular-title'];
                });
                $('.blogPosting').each(function(){
                    this.innerHTML = response.posts[0]['regular-body'];
                });
                
                // Register <code> size changes because the code elements only started to exist now. Only
                // do this on the mobile version, the desktop version has no text resizing.
                if (selector.get_mode() === 'mobile')
                    utility.change_text.register_elements(['code']);
                
                parent.prettify_code();
            });
        },
        
        prettify_code: function(){
            var a = false;
                
            // Give all code the code hightlighting css classes
            $('code').each(function() {
                if (!$(this).hasClass('prettyprint')) {
                    $(this).addClass('prettyprint');
                    a = true;
                }
            });
    
    
            // Execute the pretty print JS to do any modifications
            if (a) prettyPrint();
        }
    }
})(jQuery, Portfolio.selector, Portfolio.utility);