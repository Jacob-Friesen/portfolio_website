Portfolio.skills = (function($, utility, constant){
    return {
        init: function(show, hide){
            var parent = this;
            var main_skills = utility.attach_show_events({
                triggers: $('div[id^=skills_collapse_skill]'),
                event: "click",
                collapsers: $('ul[id^=collapse_points_skill]'),
                delay: false,
                on_show: function(trigger, collapser){
                    $(collapser).show();
                    $('#skills_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = show;
                },
                on_hide: function(trigger, collapser){
                    $(collapser).hide();
                    $('#skills_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = hide;
                }
            }).close("all");
            
            var skill_sections = constant.page_text.skills.skill_types;
            for (var i = 0; i < skill_sections.length; i++){
                utility.attach_show_events({
                    triggers: $('li[id^=skills_point_collapse_skill_'+i+']'),
                    event: "click",
                    collapsers: $('ul[id^=collapse_point_points_skill_'+i+']'),
                    delay: false,
                    parent: this,
                    on_show: function(trigger, collapser){
                        parent.trigger_skill(trigger, collapser, "show", show);
                    },
                    on_hide: function(trigger, collapser){
                        parent.trigger_skill(trigger, collapser, "hide", hide);
                    }
                }).close("all");
            }
        },
        
        trigger_skill: function(trigger, collapser, action, text){
            $(collapser)[action]();
            var split = trigger.id.split('_');
            var skill = split.pop();
            var section = split.pop();
            $('#skills_collapse_button_'+section+'_'+skill)[0].innerHTML = "<p>"+text+"</p>";
        }
    }
})(jQuery, Portfolio.utility, Portfolio.constants);