experience = {
    loaded: false,
    
    init: function(){
        if (this.loaded && window.location.pathname.replace('/','') !== 'experience')
            return true;
            
        utility.attach_show_events({
            triggers: $('div[id^=exp_collapse_job_]').not(":hidden"),
            event: "click",
            collapsers: $('ul[id^=collapse_points_]').not(":hidden"),
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
        
        this.loaded = true;
    }
};