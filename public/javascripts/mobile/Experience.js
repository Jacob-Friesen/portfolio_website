Portfolio.experience = (function($, utility){    
    return {
        init: function(show, hide){
            utility.attach_show_events({
                triggers: $('#main_box').find('div[id^=exp_collapse_job_]'),
                event: "click",
                collapsers: $('#main_box').find('ul[id^=collapse_points_]'),
                delay: false,
                on_show: function(trigger, collapser){
                    $(collapser).show();
                    $('#exp_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = show;
                },
                on_hide: function(trigger, collapser){
                    $(collapser).hide();
                    $('#exp_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = hide;
                }
            }).close("all").open(0);
        }
    }
})(jQuery, Portfolio.utility);