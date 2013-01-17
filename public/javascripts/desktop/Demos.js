demos_ns = (function () {
    var demos = [];// of type Movable eventually
    var newImage;
    var newBg;
    var newClose;
    var polling = false;
    
    return {
        init: function (){
			utility.attach_show_events({
			triggers: $('div[id^="demo_"]:visible'),
			event: "click",
			collapsers: $('div[id^="demolinks_"]:visible'),
			delay: false,
			on_show: function(trigger, collapser){
				$(collapser).show();
				$('#demo' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.SHOW;
			},
			on_hide: function(trigger, collapser){
				$(collapser).hide();
				$('#demo' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.HIDE;
			}
			}).close("all").open(0);
        },
        
        /**
         * demoFunc.js
         */
		
        resize_img: function(image){
			var large_image = $("<img/>").attr('src', image.src.replace('_s','')).attr('id', image.id + "_clone").attr('class', 'viewImage');
			large_image.lightbox_me({destroyOnClose: true, centered: true, overlaySpeed: 0, lightboxSpeed: 300});//not going to chain that would get ugly
			large_image.click(function(){ $(this).trigger('close'); });
		},
        
        /**
         * Remove the enlarged image and background from the screen
         */
        remove_resize: function (newImage){
            document.body.removeChild(newImage);
            document.body.removeChild(newBg);
            document.body.removeChild(newClose);
        },
        
        /**
         * Displays flash video in center of screen
         */
        display_flash: function (location){
            if (location == null)
                window.location = "video.html";
            else
                window.location = location;
        }
    }
})();