Portfolio.demos = (function ($, utility) {
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
        
        resize_img: function(image){
			var large_image = $("<img/>").attr('src', image.src.replace('_s','')).attr('id', image.id + "_clone");
			large_image.lightbox_me({
				destroyOnClose: true,
				centered: true
			});
			large_image.click(function(){ $(this).trigger('close'); });
		}
    }
})(jQuery, Portfolio.utility);