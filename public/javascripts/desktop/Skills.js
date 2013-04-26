Portfolio.skills = (function ($, c, utility){
	var OPEN_CLASS = 'skillsOpen';
	var CLOSE_CLASS = 'skills';
	
    return {
		init: function(){
			
			// Make each skill section openable, opening the first by default
			var parent = this;
			var main_skills = utility.attach_show_events({
				triggers: $('div[id^=skills_collapse_skill]:visible'),
				event: "click",
				collapsers: $('div[id^=collapse_points_skill]:visible'),
				delay: false,
				on_show: function(trigger, collapser){
					$(collapser).show();
					$(trigger).parent().attr('class', OPEN_CLASS);
					$('#skills_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = utility.SHOW;
				},
				on_hide: function(trigger, collapser){
					$(collapser).hide();
					$(trigger).parent().attr('class', CLOSE_CLASS);
					$('#skills_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = utility.HIDE;
				}
			});
			
			// Make each part of each skill section openable
			var skill_sections = c.page_text.skills.skill_types;
			for (var i = 0; i < skill_sections.length; i++){
				utility.attach_show_events({
					triggers: $('div[id^=skills_point_collapse_skill_'+i+']:visible'),
					event: "click",
					collapsers: $('div[id^=collapse_point_points_skill_'+i+']:visible'),
					delay: false,
					parent: this,
					on_show: function(trigger, collapser){
						$(collapser).show();
						$(trigger).children('button')[0].innerHTML =  utility.SHOW;
					},
					on_hide: function(trigger, collapser){
						$(collapser).hide();
						$(trigger).children('button')[0].innerHTML =  utility.HIDE;
					}
				}).close("all");
			}
			
			// Can only each skill section after the inner contents have been modified
			main_skills.close("all").open(0);
		}
    }
})(jQuery, Portfolio.constants, Portfolio.utility);
