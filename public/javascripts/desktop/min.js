(function(b){b.fn.menu_to_actions=function(c){this.REPLACE="_grey";this.menu_objects=[];this.settings={map_imgs:{},menu_image_at:null};c&&b.extend(this.settings,c);this.add_menu_items=function(a,c){var f=this;this.each(function(){this.opened=!1;this.img=b(this).find(c)[0];var d=this.img.src.replace("http://"+window.location.hostname+"/","");this.set_gscale=function(a){var c=b(this.img);a?(a=c.attr("src"),-1==a.search(f.REPLACE)&&(a=a.split("."),c.attr("src",a[0]+f.REPLACE+"."+a[1]),this.opened=!1)):
c.attr("src",c.attr("src").replace(f.REPLACE,""))};b(this).mouseover(function(){this.set_gscale(!1)});b(this).mouseout(function(){!1===this.opened&&this.set_gscale(!0)});b(this).click(function(){f.all_to_grey();try{a[d](this.img)}catch(b){a["http://"+Portfolio.location+"/"+d](this.img)}this.set_gscale(!1);this.opened=!0});f.menu_objects.push(this)})};this.all_to_grey=function(){for(var a=0;a<this.menu_objects.length;a++)this.menu_objects[a].set_gscale(!0)};this.set_open=function(a){b(this.menu_objects[a]).click()};
this.add_menu_items(this.settings.map_imgs,this.settings.menu_image_at);return this}})(jQuery);Portfolio.skills=function(b,c,a){return{init:function(){for(var e=a.attach_show_events({triggers:b("div[id^=skills_collapse_skill]:visible"),event:"click",collapsers:b("div[id^=collapse_points_skill]:visible"),delay:!1,on_show:function(c,d){b(d).show();b("#skills_collapse_button_"+c.id.split("_").pop())[0].innerHTML=a.SHOW},on_hide:function(c,d){b(d).hide();b("#skills_collapse_button_"+c.id.split("_").pop())[0].innerHTML=a.HIDE}}),f=c.page_text.skills.skill_types,d=0;d<f.length;d++)a.attach_show_events({triggers:b("button[id^=skills_point_collapse_skill_"+
d+"]:visible"),event:"click",collapsers:b("div[id^=collapse_point_points_skill_"+d+"]:visible"),delay:!1,parent:this,on_show:function(c,d){b(d).show();c.innerHTML=a.SHOW},on_hide:function(c,d){b(d).hide();c.innerHTML=a.HIDE}}).close("all");e.close("all").open(0)}}}(jQuery,Portfolio.constants,Portfolio.utility);Portfolio.experience=function(b,c){return{init:function(){for(var a=b(".job:visible"),e=0;e<a.length;e++)b("#job"+e+"jobText")[0]||(a.splice(e,1),e--);c.attach_show_events({triggers:a,event:"click",collapsers:b(".jobText:visible"),delay:!1,on_show:function(a,d){b(d).show();b("#job"+a.id[a.id.length-1]+"Clps")[0].innerHTML=c.SHOW},on_hide:function(a,d){b(d).hide();b("#job"+a.id[a.id.length-1]+"Clps")[0].innerHTML=c.HIDE}}).close("all").open(0)}}}(jQuery,Portfolio.utility);Portfolio.demos=function(b,c){return{init:function(){c.attach_show_events({triggers:b('div[id^="demo_"]:visible'),event:"click",collapsers:b('div[id^="demolinks_"]:visible'),delay:!1,on_show:function(a,e){b(e).show();b("#demo"+a.id[a.id.length-1]+"Clps")[0].innerHTML=c.SHOW},on_hide:function(a,e){b(e).hide();b("#demo"+a.id[a.id.length-1]+"Clps")[0].innerHTML=c.HIDE}}).close("all").open(0)},resize_img:function(a){a=b("<img/>").attr("src",a.src.replace("_s","")).attr("id",a.id+"_clone");a.lightbox_me({destroyOnClose:!0,
centered:!0});a.click(function(){b(this).trigger("close")})}}}(jQuery,Portfolio.utility);Portfolio.location=window.location.hostname;
Portfolio.start_system=function(){var b=Portfolio.pages,c=Portfolio.window_details,a=Portfolio.location;""!=window.location.port&&(a+=":"+window.location.port);var e={},f=["/images/menu_icons/home_page_grey.png","/images/menu_icons/skills_page_grey.png","/images/menu_icons/experience_page_grey.png","/images/menu_icons/demos_page_grey.png","/images/menu_icons/blog_page_grey.png"];e["http://"+a+f[0]]=function(a){c.open_item(a,b.init_home)};e["http://"+a+f[1]]=function(a){c.open_item(a,b.init_skills)};
e["http://"+a+f[2]]=function(a){c.open_item(a,b.init_exp)};e["http://"+a+f[3]]=function(a){c.open_item(a,b.init_demos)};e["http://"+a+f[4]]=function(a){c.open_item(a,b.init_blog)};a=$(".icbm_object").menu_to_actions({map_imgs:e,menu_image_at:".icbm_image"});switch(1<(window.location+"").split("#").length?(window.location+"").split("#").pop():window.location.pathname.replace("/","").replace("#","")){case "home":a.set_open(0);break;case "skills":a.set_open(1);break;case "experience":a.set_open(2);break;
case "demos":a.set_open(3);break;case "blog":a.set_open(4);break;default:a.set_open(0)}};
Portfolio.pages=function(b,c,a,e,f,d,h){function g(){b("img").each(function(){"icbm_image"!=b(this).attr("class")&&("mainImg"!=b(this)[0].id&&"link"!=b(this).attr("class"))&&this.parentNode.addEventListener("mousedown",function(a){"hMainPicture"===a.target.id?d.resize_img(a.target.childNodes[1]):d.resize_img(a.target)},!0)})}return{init_home:function(){g();b(".mainImage").each(function(a,c){b(c).attr("src",b("#mainImg").attr("src").replace("_s",""))})},init_skills:function(){g();e.init()},init_exp:function(){g();
f.init()},init_demos:function(){g();d.init()},init_blog:function(){g();h.init()},update_url:function(b){c.history.pushState?c.history.pushState(a.page_text[b].title+b+" page",a.page_text[b].title,"/"+b):c.location.href=c.location.href.split("#")[0]+"#"+b;c.document.title=a.page_text[b].title}}}(jQuery,window,Portfolio.constants,Portfolio.skills,Portfolio.experience,Portfolio.demos,Portfolio.blog);Portfolio.window_details=function(b,c){return{menu_list:{},PAGE_INTO:"window",open_item:function(a,e){if(!this.menu_list[a.src]){var f=this.menu_list,d=a.src,h;h={child:null,item_id:a.id,into:b("#"+this.PAGE_INTO),open_obj:function(){var a=b("#"+this.item_id+"_cache");null==a[0]?b.ajax({type:"GET",url:this.item_id+c.mode_to_get(),context:this,success:this.render_page}):this.render_page(a[0].innerHTML,!0)},render_page:function(a,b){!0!==b&&c.add_cache(this.item_id,a);this.into[0].innerHTML=a;this.child=
this.into.children(":first")[0];this.child.style.display="inline";this.adtnl_work(this.child)},IE_Listen:function(){this.child.onpropertychange=function(){CHECK=50;this.height=0;b(this).children().each(b.proxy(function(a,c){this.height+=b(c).height()},this));b(this.parentNode).height(this.height+60);b(this.parentNode).width(b(this).width());var a=this;setTimeout(function(){a.fireEvent("onpropertychange",document.createEventObject())},CHECK)}},adtnl_work:function(a){b(a.parentNode.parentNode).width(b(a.parentNode).width());
if(null===e)throw"Error: exec_after must be specified";e()}};f[d]=h}this.menu_list[a.src].open_obj();f=a.src.split("/").pop().split("_")[0];Portfolio.pages.update_url(f);return this}}}(jQuery,Portfolio.selector,Portfolio.pages,navigator);
