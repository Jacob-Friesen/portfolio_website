Portfolio.demos = (function($, utility, _window){
    return {
        init: function(show, hide, navigator){
            this.change_spacing(navigator);
            
            utility.attach_show_events({
                triggers: $('div[id^=collapse_demos_]'),
                event: "click",
                collapsers: $('div[id^=collapse_details_demos]'),
                delay: false,
                on_show: function(trigger, collapser){
                    $(collapser).show();
                    $('#demos_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = show;
                },
                on_hide: function(trigger, collapser){
                    $(collapser).hide();
                    $('#demos_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = hide;
                }
            }).close("all");
            
            this.init_images();
        },
        
        // Due to the use of vertical alignment to a left div, not every browser displays the same. The solution in css may exist but it is a lot more
        // complicated than browser sniffing in this case.
        change_spacing: function change_it(navigator){
            var browsers = ['chrome','opera','firefox'];
            var user_agent = navigator.userAgent.toLowerCase();
            
            // Check orientation to decide the amount to adjust
            var to = '-5%';
            if ($(_window).width() > $(_window).height())
                to = '-3%';
            
            // Modify margins if a browser is found only on the demos page
            if(_.find(browsers, function(browser){ return user_agent.search(browser) !== -1 })){
                $('.collapser').each(function(){
                    if (this.id.search('demos') > -1)
                        this.style.marginTop = to;
                });
            }
            
            $(_window).resize(function() {
                change_it(navigator);
            });
        },
        
        init_images: function(){
            var parent = this;

            // every image pops up "onclick"
            $('img[class="demo_img"]').each(function(){

                // When clicked the larger version of the element is created then lightboxed. Close it when clicked.
                $(this).click(function(){
                    var large_image = $("<img/>").attr('src', this.src.replace('_s','')).attr('id', this.id + "_clone");
                    var spinner = new Spinner({speed: 3}).spin(this.parentNode);

                    // Resize the image if it is too large for the screen
                    large_image.load(function () {
                        var proportion = $(window).width()/large_image[0].width;//jQuery width() does not work here
                        if (proportion < 1)
                            large_image[0].width = $(window).width();

                        large_image.lightbox_me({
                            destroyOnClose: true,
                            centered: true
                        });
                        large_image.click(function(){ $(this).trigger('close'); });

                        spinner.spin();
                    });
                });
            });  
        }
    }
})(jQuery, Portfolio.utility, window);