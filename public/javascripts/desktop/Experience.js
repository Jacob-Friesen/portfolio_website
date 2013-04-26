Portfolio.experience = (function ($, utility) {
    var OPEN_CLASS = 'jobOpen';
	var CLOSE_CLASS = 'job';
	
	return {
		init: function (){
			// Get jobs that are visible and have corresponding details
			var jobs = $('.jobTitle:visible');
			for (var i = 0; i < jobs.length; i++){
				if(!$('#job'+i+'jobText')[0]){
					jobs.splice(i, 1);
					i--;// compensate for new length
				}
			}
			
			console.log(jobs);
		
			utility.attach_show_events({
				triggers: jobs,
				event: "click",
				collapsers: $('.jobText:visible'),
				delay: false,
				on_show: function(trigger, collapser){
					$(collapser).show();
					console.log($(trigger).parent());
					$(trigger).parent().attr('class', OPEN_CLASS);
					$('#job' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.SHOW;
				},
				on_hide: function(trigger, collapser){
					$(collapser).hide();
					$(trigger).parent().attr('class', CLOSE_CLASS);
					$('#job' + trigger.id[trigger.id.length - 1] + "Clps")[0].innerHTML = utility.HIDE;
				}
			}).close("all").open(0);
		}
    }
})(jQuery, Portfolio.utility);