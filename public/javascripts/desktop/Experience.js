Portfolio.experience = (function ($, utility) {
    return {
       init: function (){
	    // get jobs that are visible and have corresponding details
	    var jobs = $('.job:visible');
	    for (var i = 0; i < jobs.length; i++){
			if(!$('#job'+i+'jobText')[0]){
				jobs.splice(i, 1);
				i--;// compensate for new length
			}
	    }
	
	    utility.attach_show_events({
				triggers: jobs,
				event: "click",
				collapsers: $('.jobText:visible'),
				delay: false,
				on_show: function(trigger, collapser){
					$(collapser).show();
					$('#job' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.SHOW;
				},
				on_hide: function(trigger, collapser){
					$(collapser).hide();
					$('#job' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.HIDE;
				}
			}).close("all").open(0);
       }
    }
})(jQuery, Portfolio.utility);