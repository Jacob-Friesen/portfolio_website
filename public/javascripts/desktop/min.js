(function(a,g){a.fn.menu_to_actions=function(b){var c=this;this.REPLACE="_grey";this.CACHE="cached_";this.menu_objects=[];this.settings={after_opening:null,map_imgs:{},menu_image_at:null};b&&a.extend(this.settings,b);this.add_menu_items=function(d,b,h){var i=this;this.each(function(e){var j=this;this.opened=!1;this.img=a(this).find(b)[0];var c=this.img.src.replace("http://"+window.location.hostname+"/","");this.set_gscale=function(b){function d(b){var c=a("#"+i.CACHE+f.split("_").shift()+b).clone(!0,
!0);c[0].style.display="inline";c[0].id=c[0].id.replace(i.CACHE,"")+b;h.replaceWith(c);this.img=c}var h=a(j.img),f=h.attr("src").split("/").pop();b?-1==h.attr("src").search(i.REPLACE)&&(d.call(this,i.REPLACE),this.opened=!1):d.call(this,"")};a(this).mouseenter(function(){j.set_gscale(!1)});a(this).parent().mouseleave(function(){!1===j.opened&&j.set_gscale(!0)});a(this).mouseleave(function(){!1===j.opened&&j.set_gscale(!0)});a(this).mouseup(function(){this.open()});this.open=function(a){i.all_to_grey();
try{d[c](this.img)}catch(b){d["http://"+Portfolio.location+"/"+c](this.img)}this.set_gscale(!1);this.opened=!0;a=!a?e:a;a=a>=g.length?"":g[a].toLowerCase();h(a)};i.menu_objects.push(this)})};this.all_to_grey=function(){for(var a=0;a<this.menu_objects.length;a++)this.menu_objects[a].set_gscale(!0)};this.set_open=function(b){var f=b,b=b>=g.length?0:b;a(c.menu_objects[b])[0].open(f)};this.add_menu_items(this.settings.map_imgs,this.settings.menu_image_at,this.settings.after_opening);return this}})(jQuery,
Portfolio.constants.pages);Portfolio.skills=function(a,g,b){return{init:function(){for(var c=b.attach_show_events({triggers:a("div[id^=skills_collapse_skill]:visible"),event:"click",collapsers:a("div[id^=collapse_points_skill]:visible"),delay:!1,on_show:function(d,c){a(c).show();a(d).parent().attr("class","skillsOpen");a("#skills_collapse_button_"+d.id.split("_").pop())[0].innerHTML=b.SHOW},on_hide:function(d,c){a(c).hide();a(d).parent().attr("class","skills");a("#skills_collapse_button_"+d.id.split("_").pop())[0].innerHTML=
b.HIDE}}),d=g.page_text.skills.skill_types,f=0;f<d.length;f++)b.attach_show_events({triggers:a("div[id^=skills_point_collapse_skill_"+f+"]:visible"),event:"click",collapsers:a("div[id^=collapse_point_points_skill_"+f+"]:visible"),delay:!1,parent:this,on_show:function(d,c){a(c).show();a(d).children("button")[0].innerHTML=b.SHOW},on_hide:function(d,c){a(c).hide();a(d).children("button")[0].innerHTML=b.HIDE}}).close("all");c.close("all").open(0)}}}(jQuery,Portfolio.constants,Portfolio.utility);Portfolio.experience=function(a,g){return{init:function(){for(var b=a(".jobTitle:visible"),c=0;c<b.length;c++)a("#job"+c+"jobText")[0]||(b.splice(c,1),c--);g.attach_show_events({triggers:b,event:"click",collapsers:a(".jobText:visible"),delay:!1,on_show:function(b,c){a(c).show();a(b).parent().attr("class","jobOpen");a("#job"+b.id[b.id.length-1]+"Clps")[0].innerHTML=g.SHOW},on_hide:function(b,c){a(c).hide();a(b).parent().attr("class","job");a("#job"+b.id[b.id.length-1]+"Clps")[0].innerHTML=g.HIDE}}).close("all").open(0)}}}(jQuery,
Portfolio.utility);Portfolio.demos=function(a,g){return{init:function(){g.attach_show_events({triggers:a('div[id^="demo_"]:visible'),event:"click",collapsers:a('div[id^="demolinks_"]:visible'),delay:!1,on_show:function(b,c){a(c).show();a(b).parent().attr("class","demoPaneOpen");a("#demo"+b.id[b.id.length-1]+"Clps")[0].innerHTML=g.SHOW},on_hide:function(b,c){a(c).hide();a(b).parent().attr("class","demoPane");a("#demo"+b.id[b.id.length-1]+"Clps")[0].innerHTML=g.HIDE}}).close("all").open(0)},resize_img:function(b){b=a("<img/>").attr("src",
b.src.replace("_s","")).attr("id",b.id+"_clone");b.lightbox_me({destroyOnClose:!0,centered:!0});b.click(function(){a(this).trigger("close")})}}}(jQuery,Portfolio.utility);Portfolio.location=window.location.hostname;
Portfolio.start_system=function(a,g,b,c,d,f,h){function i(a,b){e=!e?b:e;switch(a){case "home":e(0);break;case "skills":e(1);break;case "experience":e(2);break;case "demos":e(3);break;case "blog":e(4);break;case "":e(5);break;default:e(0)}}var e=null;return function(){b=Portfolio.history_tracking;d=Portfolio.pages;f=Portfolio.window_details;""!=a.location.port&&(h+=":"+a.location.port);var c={},e=["/images/menu_icons/home_page_grey.png","/images/menu_icons/skills_page_grey.png","/images/menu_icons/experience_page_grey.png",
"/images/menu_icons/demos_page_grey.png","/images/menu_icons/blog_page_grey.png"];c["http://"+h+e[0]]=function(a){f.open_item(a,d.init_home)};c["http://"+h+e[1]]=function(a){f.open_item(a,d.init_skills)};c["http://"+h+e[2]]=function(a){f.open_item(a,d.init_exp)};c["http://"+h+e[3]]=function(a){f.open_item(a,d.init_demos)};c["http://"+h+e[4]]=function(a){f.open_item(a,d.init_blog)};c=g(".icbm_object").menu_to_actions({after_opening:function(a){b.after_page_loads(a)},map_imgs:c,menu_image_at:".icbm_image"});
b.init(d,i);e=1<(a.location+"").split("#").length?(a.location+"").split("#").pop():a.location.pathname.replace("/","").replace("#","");i(e,c.set_open)}}(window,jQuery,Portfolio.history_tracking,Portfolio.page_history,Portfolio.pages,Portfolio.window_details,Portfolio.location);
Portfolio.pages=function(a,g,b,c,d,f,h,i){function e(){a("img").each(function(){-1==a(this).attr("class").search("icbm_image")&&("mainImg"!=a(this)[0].id&&"link"!=a(this).attr("class"))&&(a(i).off("mousedown","#"+this.id),a(i).on("mousedown","#"+this.id,function(a){"hMainPicture"===a.target.id?f.resize_img(a.target.childNodes[1]):f.resize_img(a.target)}))})}return{init_home:function(){e();a(".mainImage").each(function(b,c){a(c).attr("src",a("#mainImg").attr("src").replace("_s",""))})},init_skills:function(){e();
c.init()},init_exp:function(){e();d.init()},init_demos:function(){e();f.init()},init_blog:function(){e();h.init()}}}(jQuery,window,Portfolio.constants,Portfolio.skills,Portfolio.experience,Portfolio.demos,Portfolio.blog,window.document);Portfolio.window_details=function(a,g){return{menu_list:{},PAGE_INTO:"window",open_item:function(b,c){var d=a(b).attr("src");if(!this.menu_list[d]){var f=this.menu_list,h;h={child:null,item_id:a(b).attr("id").split("_").shift(),into:a("#"+this.PAGE_INTO),open_obj:function(){var b=a("#"+this.item_id+"_cache");null==b[0]?a.ajax({type:"GET",url:this.item_id+g.mode_to_get(),context:this,success:this.render_page}):this.render_page(b[0].innerHTML,!0)},render_page:function(a,b){!0!==b&&g.add_cache(this.item_id,
a);this.into[0].innerHTML=a;this.child=this.into.children(":first")[0];this.child.style.display="inline";if(null===c)throw"Error: exec_after must be specified";c()}};f[d]=h}this.menu_list[d].open_obj();d.split("/").pop().split("_");return this}}}(jQuery,Portfolio.selector,Portfolio.pages,navigator);
