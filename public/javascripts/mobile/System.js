Portfolio.start_system = function (){
    if (window.jasmine) return true;// test mode
    
    // Tries to load the sent in value if loaded via URL. Otherwise checks for a hash and loads using that
    var page = window.location.href.split('/#').pop();
    page = page.replace('#top','');
    
    if (page == window.location.href)
       page = page.split('/').pop();
     
    // Default page is home so when empty set page to that
    page = (page === '') ? 'home' : page;
    
    Portfolio.system.init_with(page);
    
    return true; 
};

Portfolio.system = (function($, Selector, utility, menu, constant, skills, experience, demos, blog, navigator){
    // firefox + safari render button text way to large, so I must readjust the size
    var button_class = '';
    var nav = navigator.userAgent.toLowerCase();
    if ((nav.search('firefox') !== -1 || nav.search('safari') !== -1) && nav.search('chrome') === -1)
        button_class = 'firefox_button';
    
    return {
        SHOW: '<p class='+button_class+'>▲</p>',
        HIDE: '<p class='+button_class+'>▼</p>',
        
        NEW_PAGE: null,
        COLR_BAR: null,
        
        // Sets constants then initializes current pages javascript. Then opens the current page.
        init_with: function(cur_page){
            this.NEW_PAGE = $('#main_box');// Cached for later
            this.COLR_BAR = $('.page_state');// Cached for later
            
            this.pre_page_load();
            
            var parent = this;
            menu.init(constant.pages, constant.page_text, this.NEW_PAGE, this.NEW_PAGE, function(page){
                parent.page_init(page);
            });
            menu.open_link(cur_page);
        },
        
        // Sets up bottom bar, so adds event handlers for the buttons. Also sets the text to normal.
        pre_page_load: function(){
            var parent = this;
            $('#small_text_change').mousemove(function(){ parent.update_text('small', this); });
            $('#normal_text_change').mousemove(function(){ parent.update_text('normal', this); });
            $('#large_text_change').mousemove(function(){ parent.update_text('large', this); });
            
            this.update_text('normal', $('#normal_text_change')[0]);
        },
        
        // Adjust the size of the text based on size. Then updates the element to show that it is
        // disabled, and all the other ones are now not disabled.
        update_text: function(size, button){
            utility.change_text['to_' + size]();
            
            // Update all other buttons to the default class except the one selected
            $('button[id$="text_change"]').each(function(){
                this.className = "text_change";
            })
            if(button) button.className = "text_change_selected";
        },
        
        // Does any necessary operations for a page once its loaded
        page_init: function(page){
            // Update the main color bar that provides page context
            this.COLR_BAR.attr('id', page);
            
            this[page].init(this.SHOW, this.HIDE, navigator);
            
            // Make sure text is in the right size on page load
            utility.change_text.change_size_by(utility.change_text.current_scale);
            
            this.handle_float();
        },
        
        // Compensates for all browsers not supporting float.
        handle_float: function(){
            if(utility.browser_that_supports_float(navigator.userAgent))
                return false;
            
            $('#page_options').css('position', 'relative').css('float', 'right').width(290);
            $('#safety_space').height(0);
            // make sure page options is always at the very bottom of the page, if not move it there.
            if($('#page_options').offset().top < $(window).height())
                $('#safety_space').height($(window).height() - $('#page_options').offset().top);
                
            return true;
        },
      
        // Just clears up image of myself
        home: {
            init: function(){
                $("#main_image").each( function () {
                    $(this).attr("src", $(this).attr("src").replace('_s',''));
                });
            }
        },
        
        experience: experience,
        skills: skills,
        demos: demos,
        blog: blog
    }
})(jQuery, Portfolio.selector, Portfolio.utility, Portfolio.menu, Portfolio.constants, Portfolio.skills, Portfolio.experience,
   Portfolio.demos, Portfolio.blog, window.navigator);
