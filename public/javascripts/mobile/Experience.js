experience = {
    init: function(){
        utility.attach_show_events({
            triggers: $('div[id^=exp_collapse_job_]'),
            event: "click",
            collapsers: $('ul[id^=collapse_points_]'),
            delay: false,
            on_show: function(trigger, collapser){
                $(collapser).show();
                $('#exp_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = system.SHOW;
            },
            on_hide: function(trigger, collapser){
                $(collapser).hide();
                $('#exp_collapse_button_' + trigger.id.split('_').pop())[0].innerHTML = system.HIDE;
            }
        }).close("all").open(0);
    }
};