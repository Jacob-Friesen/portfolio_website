(function(b){b.fn.watch=function(a,c,d,e){function g(a,c,e){a.each(function(){var a=b(this);"object"==typeof a.get(0).onpropertychange?a.bind("propertychange."+c,e.fnc):b.browser.mozilla?a.bind("DOMAttrModified."+c,e.fnc):e.intervalId=setInterval(e.fnc,d)})}function f(a){var c=b(this),d=c.data(a);if(d&&d.func){c.unwatch(a);var e=!1,f=0;for(f;f<d.props.length;f++){var j=c.css(d.props[f]);if(d.vals[f]!=j){d.vals[f]=j;e=!0;break}}e&&d.func.call(this,d,f);g(c,a,d)}}d||(d=100);e||(e="_watcher");return this.each(function(){var k=
this,i=b(this),h={id:e,props:a.split(","),vals:[a.split(",").length],func:c,fnc:function(){f.call(k,e)},origProps:a,interval:d,intervalId:null};b.each(h.props,function(a){h.vals[a]=i.css(h.props[a])});i.data(e,h);g(i,e,h)})};b.fn.unwatch=function(a){this.each(function(){var c=b(this),d=c.data(a);try{"object"==typeof this.onpropertychange?c.unbind("propertychange."+a,d.fnc):b.browser.mozilla?c.unbind("DOMAttrModified."+a,d.fnc):clearInterval(d.intervalId)}catch(e){}});return this}})(jQuery);(function(b){jQuery.fn.window_tiles=function(a){this.settings={after:[]};a&&b.extend(this.settings,a);this.tile_list=[];this.PAGE_INTO="window";this.set_tiles=function(){b("#icon_based_menu").find("img").each(b.proxy(function(a,b){this.tile_list.push(Window_Tile(b,a,this.settings.after[a],this))},this))};this.open_item=function(a){this.tile_list[a].open_obj();pages.update_url(a);this.extra(a,!0)};this.extra=function(a,d){var e="none";!1==d&&(e="inline");b(".tile_menu_cent").each(function(d,f){b(f).children()[a].style.display=
e})};this.set_tiles();return this};Window_Tile=function(a,c,d,e){return{OPEN_TITLE:"Open...",ITEM_NUM:c,close_btn:null,child:null,item_id:a.id,into:b("#"+e.PAGE_INTO),into_html:null,into_old_xy:[null,null],tiles:e,exec_after:d,open_obj:function(){var a=b("#"+this.item_id+"_cache");null==a[0]?b.ajax({type:"GET",url:this.item_id+Selector.mode_to_get(),context:this,success:this.render_child}):this.render_child(a[0].innerHTML,!0)},render_child:function(a,c){!0!=c&&Selector.add_cache(this.item_id,a);this.into[0].innerHTML=
a;this.child=this.into.children(":first")[0];this.child.style.display="inline";b(this.into).height(b(this.child).height()+2);b(this.into).width(b(this.child).width());b(this.child).watch("height, width",function(){b(this.parentNode).height(b(this).height()+2);b(this.parentNode).width(b(this).width())});"Microsoft Internet Explorer"==navigator.appName&&this.IE_Listen();this.adtnl_work(this.child)},IE_Listen:function(){this.child.onpropertychange=function(){CHECK=50;this.height=0;b(this).children().each(b.proxy(function(a,
c){this.height+=b(c).height()},this));b(this.parentNode).height(this.height+45);b(this.parentNode).width(b(this).width());var a=this;setTimeout(function(){a.fireEvent("onpropertychange",document.createEventObject())},CHECK)}},adtnl_work:function(a){b(a.parentNode.parentNode).width(b(a.parentNode).width());if(null==this.exec_after)throw"Error: exec_after must be specified";this.exec_after()},close_obj:function(){this.close_btn.click()}}}})(jQuery);(function(b){jQuery.fn.icbm=function(a){this.REPLACE="_grey";this.menu_objs=[];var c=this;this.add_menu_items=function(a){var e=[];b(".icbm_object").each(function(){this.REPLACE=c.REPLACE;this.opened=!1;this.img=b(this).find(".icbm_image")[0];var g=this.img.src.replace("http://"+window.location.hostname+"/","");this.set_gscale=function(a){var c=b(this.img);a?(a=c.attr("src"),-1==a.search(this.REPLACE)&&(src_parts=a.split("."),c.attr("src",src_parts[0]+this.REPLACE+"."+src_parts[1]),this.opened=!1)):
c.attr("src",c.attr("src").replace(this.REPLACE,""))};b(this).mouseover(b.proxy(function(){this.set_gscale(!1)},this));b(this).mouseout(function(){!1==this.opened&&this.set_gscale(!0)});b(this).click(b.proxy(function(){c.all_to_grey();try{a[g]()}catch(b){a["http://"+LOCATION+"/"+g]()}this.set_gscale(!1);this.opened=!0},this));e.push(this)});this.menu_objs=e};this.all_to_grey=function(){for(var a=0;a<this.menu_objs.length;a++)this.menu_objs[a].set_gscale(!0)};this.set_open=function(a){b(this.menu_objs[a]).click()};
this.settings={map_imgs:{}};a&&b.extend(this.settings,a);this.add_menu_items(this.settings.map_imgs);return this}})(jQuery);if("function"!==typeof Object.nu)Object.nu=function(b){function a(){}a.prototype=b;return new a};else throw"Object.nu is already defined";
utility={SHOW:"-",HIDE:"+",attach_show_events:function(b){return Object.nu({init:function(a){this.triggers=b.triggers;this.event=b.event;this.collapsers=b.collapsers;this.on_hide=b.on_hide;this.on_show=b.on_show;this.chk_attr="name";b.chk_attr&&(this.chk_attr=b.chk_attr);a||this.attach_events();return this},attach_events:function(){this.order_matchers_by_name();for(var a=0,b=0;a<this.triggers.length&&b<this.triggers.length;b++)$(this.triggers[a]).attr(this.chk_attr)==$(this.collapsers[b]).attr(this.chk_attr)&&
(this.triggers[a].collapser=this.collapsers[b],$(this.triggers[a])[this.event]($.proxy(this.on_event,this)),a+=1)},on_event:function(a){a=a.currentTarget;if("none"==$(a.collapser).css("display"))this.on_show(a,a.collapser);else this.on_hide(a,a.collapser)},open:function(a){this.do_event("on_show",a);return this},close:function(a){this.do_event("on_hide",a);return this},do_event:function(a,b){if("all"==b)for(var d=0;d<this.triggers.length;d++)this[a](this.triggers[d],this.triggers[d].collapser);else this[a](this.triggers[b],
this.triggers[b].collapser)},order_matchers_by_name:function(){if(!this.triggers||!this.triggers.sort||!this.collapsers||!this.collapsers.sort)return!1;if(this.triggers.length!=this.collapsers.length)throw"triggers must be the same length as collapsers";var a=this,b=function(b,c){return $(b).attr(a.chk_attr)>$(c).attr(a.chk_attr)?1:$(b).attr(a.chk_attr)<$(c).attr(a.chk_attr)?-1:0};this.triggers.sort(b);this.collapsers.sort(b);return!0},get_collapsee:function(a){a=a.id.split("_").pop();return $("#"+
this.collapse_to+a)}}.init(b.delay))}};LOCATION=window.location.hostname;
start_system=function(){var b=$().window_tiles({after:[function(){pages.init_home()},function(){pages.init_skills()},function(){pages.init_exp()},function(){pages.init_demos()},function(){pages.init_blog()}]});""!=window.location.port&&(LOCATION+=":"+window.location.port);var a={},c=["/images/menu_icons/home_page_grey.png","/images/menu_icons/skills_page_grey.png","/images/menu_icons/experience_page_grey.png","/images/menu_icons/demos_page_grey.png","/images/menu_icons/blog_page_grey.png"];a["http://"+
LOCATION+c[0]]=function(){b.open_item(0)};a["http://"+LOCATION+c[1]]=function(){b.open_item(1)};a["http://"+LOCATION+c[2]]=function(){b.open_item(2)};a["http://"+LOCATION+c[3]]=function(){b.open_item(3)};a["http://"+LOCATION+c[4]]=function(){b.open_item(4)};a=$(document.body).icbm({map_imgs:a});switch(window.location.pathname.replace("/","").replace("#","")){case "home":a.set_open(0);break;case "skills":a.set_open(1);break;case "experience":a.set_open(2);break;case "demos":a.set_open(3);break;case "blog":a.set_open(4);
break;default:a.set_open(0)}};
var pages=function(){return{defaults:function(){$("img").each(function(){"icbm_image"!=$(this).attr("class")&&("mainImg"!=$(this)[0].id&&"link"!=$(this).attr("class"))&&this.parentNode.addEventListener("mousedown",function(b){"hMainPicture"==b.target.id?demos_ns.resize_img(b.target.childNodes[1]):demos_ns.resize_img(b.target)},!0)})},init_home:function(){this.defaults();$(".mainImage").each(function(b,a){$(a).attr("src",$("#mainImg").attr("src").replace("_s",""))})},init_skills:function(){this.defaults();
skills_ns.init()},init_exp:function(){this.defaults();exp_ns.init()},init_demos:function(){this.defaults();demos_ns.init()},init_blog:function(){this.defaults();blog_ns.init()},update_url:function(b){for(var a=null,c=0;c<constant.pages.length;c++)if(c==b){a=constant.pages[c].toLowerCase();break}if(!a)throw"Error: "+b+" was not found in the list of pages.";window.history.pushState?window.history.pushState(constant.page_text[a].title+a+" page",constant.page_text[a].title,"/"+a):window.location.href=
window.location.href.split("#")[0]+"#"+a;document.title=constant.page_text[a].title}}}();var skills_ns=function(){return{init:function(){for(var b=utility.attach_show_events({triggers:$("div[id^=skills_collapse_skill]:visible"),event:"click",collapsers:$("div[id^=collapse_points_skill]:visible"),delay:!1,on_show:function(a,b){$(b).show();$("#skills_collapse_button_"+a.id.split("_").pop())[0].innerHTML=utility.SHOW},on_hide:function(a,b){$(b).hide();$("#skills_collapse_button_"+a.id.split("_").pop())[0].innerHTML=utility.HIDE}}),a=constant.page_text.skills.skill_types,c=0;c<a.length;c++)utility.attach_show_events({triggers:$("button[id^=skills_point_collapse_skill_"+
c+"]:visible"),event:"click",collapsers:$("div[id^=collapse_point_points_skill_"+c+"]:visible"),delay:!1,parent:this,on_show:function(a,b){$(b).show();a.innerHTML=utility.SHOW},on_hide:function(a,b){$(b).hide();a.innerHTML=utility.HIDE}}).close("all");b.close("all").open(0)}}}();exp_ns=function(){return{init:function(){for(var b=$(".job:visible"),a=0;a<b.length;a++)$("#job"+a+"jobText")[0]||(b.splice(a,1),a--);utility.attach_show_events({triggers:b,event:"click",collapsers:$(".jobText:visible"),delay:!1,on_show:function(a,b){$(b).show();$("#job"+a.id[a.id.length-1]+"Clps")[0].innerHTML=utility.SHOW},on_hide:function(a,b){$(b).hide();$("#job"+a.id[a.id.length-1]+"Clps")[0].innerHTML=utility.HIDE}}).close("all").open(0)}}}();demos_ns=function(){return{init:function(){utility.attach_show_events({triggers:$('div[id^="demo_"]:visible'),event:"click",collapsers:$('div[id^="demolinks_"]:visible'),delay:!1,on_show:function(b,a){$(a).show();$("#demo"+b.id[b.id.length-1]+"Clps")[0].innerHTML=utility.SHOW},on_hide:function(b,a){$(a).hide();$("#demo"+b.id[b.id.length-1]+"Clps")[0].innerHTML=utility.HIDE}}).close("all").open(0)},resize_img:function(b){b=$("<img/>").attr("src",b.src.replace("_s","")).attr("id",b.id+"_clone");b.lightbox_me({destroyOnClose:!0,
centered:!0});b.click(function(){$(this).trigger("close")})},remove_resize:function(b){document.body.removeChild(b);document.body.removeChild(void 0);document.body.removeChild(void 0)},display_flash:function(b){window.location=null==b?"video.html":b}}}();blog_ns=function(){return{init:function(){}}}();
