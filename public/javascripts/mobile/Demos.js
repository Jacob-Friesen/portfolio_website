demos = {
    init: function(){
        utility.attach_show_events({
            triggers: $('div[id^=collapse_demos_]'),
            event: "click",
            collapsers: $('div[id^=collapse_details_demos]'),
            delay: false,
            on_show: function(trigger, collapser){
                $(collapser).show();
                $('#demos_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = system.SHOW;
            },
            on_hide: function(trigger, collapser){
                 $(collapser).hide();
                $('#demos_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = system.HIDE;
            }
        }).close("all");
        
        this.init_images();
    },
    
    init_images: function(){
      // every image pops up "onclick"
        $('img[class="demo_img"]').each(function(){
            // When clicked the larger version of the element is created then lightboxed. Close it when clicked.
            $(this).click(function(){
                var large_image = $("<img/>").attr('src', this.src.replace('_s','')).attr('id', this.id + "_clone");
                large_image.lightbox_me({
                    destroyOnClose: true
                });
                large_image.click(function(){ $(this).trigger('close'); });
            });
        });  
    }
};