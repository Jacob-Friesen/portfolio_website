Portfolio.demos=function(a,e,f){return{init:function(d,b,c){this.change_spacing(c);e.attach_show_events({triggers:a("div[id^=collapse_demos_]"),event:"click",collapsers:a("div[id^=collapse_details_demos]"),delay:!1,on_show:function(b,c){a(c).show();a("#demos_collapse_button_"+b.id.split("_").pop())[0].innerHTML=d},on_hide:function(d,c){a(c).hide();a("#demos_collapse_button_"+d.id.split("_").pop())[0].innerHTML=b}}).close("all");this.init_images()},change_spacing:function b(c){var e=c.userAgent.toLowerCase(),
g="-5%";a(f).width()>a(f).height()&&(g="-3%");_.find(["chrome","opera","firefox"],function(a){return-1!==e.search(a)})&&a(".collapser").each(function(){-1<this.id.search("demos")&&(this.style.marginTop=g)});a(f).resize(function(){b(c)})},init_images:function(){a('img[class="demo_img"]').each(function(){a(this).click(function(){var b=a("<img/>").attr("src",this.src.replace("_s","")).attr("id",this.id+"_clone");b.lightbox_me({destroyOnClose:!0});b.click(function(){a(this).trigger("close")})})})}}}(jQuery,
Portfolio.utility,window);Portfolio.experience=function(a,e){return{init:function(f,d){e.attach_show_events({triggers:a("div[id^=exp_collapse_job_]").not(":hidden"),event:"click",collapsers:a("ul[id^=collapse_points_]").not(":hidden"),delay:!1,on_show:function(d,c){a(c).show();a("#exp_collapse_button_"+d.id.split("_").pop())[0].innerHTML=f},on_hide:function(b,c){a(c).hide();a("#exp_collapse_button_"+b.id.split("_").pop())[0].innerHTML=d}}).close("all").open(0)}}}(jQuery,Portfolio.utility);Portfolio.skills=function(a,e,f){return{init:function(d,b){var c=this;e.attach_show_events({triggers:a("div[id^=skills_collapse_skill]"),event:"click",collapsers:a("ul[id^=collapse_points_skill]"),delay:!1,on_show:function(b,c){a(c).show();a("#skills_collapse_button_"+b.id.split("_").pop())[0].innerHTML=d},on_hide:function(d,c){a(c).hide();a("#skills_collapse_button_"+d.id.split("_").pop())[0].innerHTML=b}}).close("all");for(var h=f.page_text.skills.skill_types,g=0;g<h.length;g++)e.attach_show_events({triggers:a("li[id^=skills_point_collapse_skill_"+
g+"]"),event:"click",collapsers:a("ul[id^=collapse_point_points_skill_"+g+"]"),delay:!1,parent:this,on_show:function(a,b){c.trigger_skill(a,b,"show",d)},on_hide:function(a,d){c.trigger_skill(a,d,"hide",b)}}).close("all")},trigger_skill:function(d,b,c,e){a(b)[c]();b=d.id.split("_");d=b.pop();b=b.pop();a("#skills_collapse_button_"+b+"_"+d)[0].innerHTML="<p>"+e+"</p>"}}}(jQuery,Portfolio.utility,Portfolio.constants);Portfolio.menu=function(a,e,f){return{EVENT:"mouseenter",LINK_NAME:"_link",page_text:null,loader:null,placed:null,page_initializer:null,cur_page:null,init:function(a,b,c,e,f){this.page_text=b;this.page_initializer=f;this.loader=c;this.placed=e;if(null===a||1>a.length)throw"Error pages sent in is null";this.attach_page_events(a)},attach_page_events:function(d){for(var b=0;b<d.length;b++){var c=d[b].toLowerCase();1<c.split("exp").length&&(c="experience");c=c.split("/").pop();a("#"+c+this.LINK_NAME)[this.EVENT](a.proxy(this.open_link,
this,c))}},open_link:function(d){d=d.split("/").pop();this.loader[0].innerHTML="<center>Loading...<center>";this.cur_page&&e.add_cache(this.cur_page,this.placed[0].innerHTML);var b=a("#"+d+"_cache");null==b[0]?this.placed.load("/"+d+e.mode_to_get(),null,a.proxy(this.new_page,this,d)):(this.placed[0].innerHTML=b[0].innerHTML,this.new_page(d))},new_page:function(a){window.history.pushState?window.history.pushState(this.page_text[a].title+a+" page",this.page_text[a].title,"/"+a):window.location.href=
window.location.href.split("#")[0]+"#"+a;f.title=this.page_text[a].title;this.page_initializer(a)}}}(jQuery,Portfolio.selector,window.document);Portfolio.start_system=function(){if(window.jasmine)return!0;var a=window.location.href.split("/#").pop(),a=a.replace("#top","");a==window.location.href&&(a=a.split("/").pop());Portfolio.system.init_with(""===a?"home":a);return!0};
Portfolio.system=function(a,e,f,d,b,c,h,g,j,i){e="";-1!==i.userAgent.toLowerCase().search("firefox")&&(e="firefox_button");return{SHOW:"<p class="+e+">\u25b2</p>",HIDE:"<p class="+e+">\u25bc</p>",NEW_PAGE:null,COLR_BAR:null,init_with:function(c){this.NEW_PAGE=a("#main_box");this.COLR_BAR=a(".page_state");this.pre_page_load();var e=this;d.init(b.pages,b.page_text,this.NEW_PAGE,this.NEW_PAGE,function(a){e.page_init(a)});d.open_link(c)},pre_page_load:function(){var b=this;a("#small_text_change").mousemove(function(){b.update_text("small",
this)});a("#normal_text_change").mousemove(function(){b.update_text("normal",this)});a("#large_text_change").mousemove(function(){b.update_text("large",this)});this.update_text("normal",a("#normal_text_change")[0])},update_text:function(b,c){f.change_text["to_"+b]();a('button[id$="text_change"]').each(function(){this.className="text_change"});c&&(c.className="text_change_selected")},page_init:function(a){this.COLR_BAR.attr("id",a);this[a].init(this.SHOW,this.HIDE,i);f.change_text.change_size_by(f.change_text.current_scale);
this.handle_float()},handle_float:function(){if(f.browser_that_supports_float(i.userAgent))return!1;a("#page_options").css("position","relative").css("float","right").width(290);a("#safety_space").height(0);a("#page_options").offset().top<a(window).height()&&a("#safety_space").height(a(window).height()-a("#page_options").offset().top);return!0},home:{init:function(){a("#main_image").each(function(){a(this).attr("src",a(this).attr("src").replace("_s",""))})}},experience:h,skills:c,demos:g,blog:j}}(jQuery,
Portfolio.selector,Portfolio.utility,Portfolio.menu,Portfolio.constants,Portfolio.skills,Portfolio.experience,Portfolio.demos,Portfolio.blog,window.navigator);
