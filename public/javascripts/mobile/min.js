(function(a){a.fn.lightbox_me=function(b){return this.each(function(){function c(){var b=e[0].style;d.destroyOnClose?e.add(h).remove():e.add(h).hide();d.parentLightbox&&d.parentLightbox.fadeIn(200);j.remove();e.undelegate(d.closeSelector,"click");a(window).unbind("reposition",g);a(window).unbind("reposition",f);a(window).unbind("scroll",f);a(window).unbind("keyup.lightbox_me");i&&b.removeExpression("top");d.onClose()}function g(){a(window).height()<a(document).height()?(h.css({height:a(document).height()+
"px"}),j.css({height:a(document).height()+"px"})):(h.css({height:"100%"}),i&&(a("html,body").css("height","100%"),j.css("height","100%")))}function f(){var b=e[0].style;e.css({left:"50%",marginLeft:-1*(e.outerWidth()/2),zIndex:d.zIndex+3});if(e.height()+80>=a(window).height()&&("absolute"!=e.css("position")||i)){var c=a(document).scrollTop()+40;e.css({position:"absolute",top:c+"px",marginTop:0});i&&b.removeExpression("top")}else e.height()+80<a(window).height()&&(i?(b.position="absolute",d.centered?
(b.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),b.marginTop=0):(c=d.modalCSS&&d.modalCSS.top?parseInt(d.modalCSS.top):0,b.setExpression("top","((blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+c+') + "px"'))):d.centered?e.css({position:"fixed",top:"50%",
marginTop:-1*(e.outerHeight()/2)}):e.css({position:"fixed"}).css(d.modalCSS))}var d=a.extend({},a.fn.lightbox_me.defaults,b),h=a(),e=a(this),j=a('<iframe id="foo" style="z-index: '+(d.zIndex+1)+';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>'),i=a.browser.msie&&7>a.browser.version;d.showOverlay&&(h=0<a(".js_lb_overlay:visible").length?a('<div class="lb_overlay_clear js_lb_overlay"/>'):a('<div class="'+d.classPrefix+'_overlay js_lb_overlay"/>'));
if(i){var k=/^https/i.test(window.location.href||"")?"javascript:false":"about:blank";j.attr("src",k);a("body").append(j)}a("body").append(e.hide()).append(h);d.showOverlay&&(g(),h.css({position:"absolute",width:"100%",top:0,left:0,right:0,bottom:0,zIndex:d.zIndex+2,display:"none"}),h.hasClass("lb_overlay_clear")||h.css(d.overlayCSS));d.showOverlay?h.fadeIn(d.overlaySpeed,function(){f();e[d.appearEffect](d.lightboxSpeed,function(){g();f();d.onLoad()})}):(f(),e[d.appearEffect](d.lightboxSpeed,function(){d.onLoad()}));
d.parentLightbox&&d.parentLightbox.fadeOut(200);a(window).resize(g).resize(f).scroll(f);a(window).bind("keyup.lightbox_me",function(a){(a.keyCode==27||a.DOM_VK_ESCAPE==27&&a.which==0)&&d.closeEsc&&c()});d.closeClick&&h.click(function(a){c();a.preventDefault});e.delegate(d.closeSelector,"click",function(a){c();a.preventDefault()});e.bind("close",c);e.bind("reposition",f)})};a.fn.lightbox_me.defaults={appearEffect:"fadeIn",appearEase:"",overlaySpeed:250,lightboxSpeed:300,closeSelector:".close",closeClick:!0,
closeEsc:!0,destroyOnClose:!1,showOverlay:!0,parentLightbox:!1,onLoad:function(){},onClose:function(){},classPrefix:"lb",zIndex:999,centered:!1,modalCSS:{top:"40px"},overlayCSS:{background:"black",opacity:0.3}}})(jQuery);demos={init:function(){utility.attach_show_events({triggers:$("div[id^=collapse_demos_]"),event:"click",collapsers:$("div[id^=collapse_details_demos]"),delay:!1,on_show:function(a,b){$(b).show();$("#demos_collapse_button_"+a.id.split("_").pop())[0].innerHTML=system.SHOW},on_hide:function(a,b){$(b).hide();$("#demos_collapse_button_"+a.id.split("_").pop())[0].innerHTML=system.HIDE}}).close("all");this.init_images()},init_images:function(){$('img[class="demo_img"]').each(function(){$(this).click(function(){var a=
$("<img/>").attr("src",this.src.replace("_s","")).attr("id",this.id+"_clone");a.lightbox_me({destroyOnClose:!0,centered:!0,overlaySpeed:0,lightboxSpeed:300});a.click(function(){$(this).trigger("close")})})})}};experience={init:function(){utility.attach_show_events({triggers:$("div[id^=exp_collapse_job_]"),event:"click",collapsers:$("ul[id^=collapse_points_]"),delay:!1,on_show:function(a,b){$(b).show();$("#exp_collapse_button_"+a.id.split("_").pop())[0].innerHTML=system.SHOW},on_hide:function(a,b){$(b).hide();$("#exp_collapse_button_"+a.id.split("_").pop())[0].innerHTML=system.HIDE}}).close("all").open(0)}};skills={init:function(){utility.attach_show_events({triggers:$("div[id^=skills_collapse_skill]"),event:"click",collapsers:$("ul[id^=collapse_points_skill]"),delay:!1,on_show:function(a,b){$(b).show();$("#skills_collapse_button_"+a.id.split("_").pop())[0].innerHTML=system.SHOW},on_hide:function(a,b){$(b).hide();$("#skills_collapse_button_"+a.id.split("_").pop())[0].innerHTML=system.HIDE}}).close("all");for(var a=constant.page_text.skills.skill_types,b=0;b<a.length;b++)utility.attach_show_events({triggers:$("li[id^=skills_point_collapse_skill_"+
b+"]"),event:"click",collapsers:$("ul[id^=collapse_point_points_skill_"+b+"]"),delay:!1,parent:this,on_show:function(a,b){skills.trigger_skill(a,b,"show",system.SHOW)},on_hide:function(a,b){skills.trigger_skill(a,b,"hide",system.HIDE)}}).close("all")},trigger_skill:function(a,b,c,g){$(b)[c]();b=a.id.split("_");a=b.pop();b=b.pop();$("#skills_collapse_button_"+b+"_"+a)[0].innerHTML="<p>"+g+"</p>"}};"function"!==typeof Object.nu?Object.nu=function(a){function b(){}b.prototype=a;return new b}:alert("Object.nu is already defined");
var utility={init:function(){this.change_text.init();return this},browser_that_supports_float:function(a){var b=["iphone os "," like"];if(null==a)return!0;a=a.toLowerCase();if(0<=a.search("iphone")){if(a=a.split(b[0]),b=a[a.length-1].split(b[1])[0],4>=Number(b.split("_")[0]))return!1}else if(0<=a.search("opera"))return!1;return!0},attach_show_events:function(a){return Object.nu({init:function(b){this.triggers=a.triggers;this.event=a.event;this.collapsers=a.collapsers;this.on_hide=a.on_hide;this.on_show=
a.on_show;this.chk_attr="name";a.chk_attr&&(this.chk_attr=a.chk_attr);b||this.attach_events();return this},attach_events:function(){this.order_matchers_by_name();for(var a=0,c=0;a<this.triggers.length&&c<this.triggers.length;c++)$(this.triggers[a]).attr(this.chk_attr)==$(this.collapsers[c]).attr(this.chk_attr)&&(this.triggers[a].collapser=this.collapsers[c],$(this.triggers[a])[this.event]($.proxy(this.on_event,this)),a+=1)},on_event:function(a){a=a.currentTarget;if("none"==$(a.collapser).css("display"))this.on_show(a,
a.collapser);else this.on_hide(a,a.collapser)},open:function(a){this.do_event("on_show",a);return this},close:function(a){this.do_event("on_hide",a);return this},do_event:function(a,c){if("all"==c)for(var g=0;g<this.triggers.length;g++)this[a](this.triggers[g],this.triggers[g].collapser);else this[a](this.triggers[c],this.triggers[c].collapser)},order_matchers_by_name:function(){if(!this.triggers||!this.triggers.sort||!this.collapsers||!this.collapsers.sort)return!1;if(this.triggers.length!=this.collapsers.length)throw"triggers must be the same length as collapsers";
var a=this,c=function(c,f){return $(c).attr(a.chk_attr)>$(f).attr(a.chk_attr)?1:$(c).attr(a.chk_attr)<$(f).attr(a.chk_attr)?-1:0};this.triggers.sort(c);this.collapsers.sort(c);return!0},get_collapsee:function(a){a=a.id.split("_").pop();return $("#"+this.collapse_to+a)}}.init(a.delay))},update_layout:{changes:{},update:function(a){for(selector in this.changes){var b=$(selector);b[0]&&b.css(this.changes[selector][a][0],this.changes[selector][a][1])}}},change_text:{current_scale:1,TO_CHANGE:[["#body",
-1],["h1",-1],["h4",-1]],to:{small:function(){utility.change_text.change_size_by(0.75)},normal:function(){utility.change_text.change_size_by(1)},large:function(){utility.change_text.change_size_by(1.25)}},init:function(){for(var a=0;a<this.TO_CHANGE.length;a++){var b=$(this.TO_CHANGE[a][0]).first();b[0]&&(this.TO_CHANGE[a][1]=Number(b.css("font-size").replace("px","")))}},change_size_by:function(a){this.current_scale=a;for(var b=0;b<this.TO_CHANGE.length;b++){var c=$(this.TO_CHANGE[b][0]),g=this.TO_CHANGE[b][1];
if(c[0]&&1<c.length)for(var f=0;f<c.length;f++)$(c[f]).css("font-size",g*a);else c[0]&&c.css("font-size",g*a)}utility.update_layout.update(a)}}};$(document).ready(function(){utility.init()});var menu={EVENT:"mouseenter",LINK_NAME:"_link",title:null,page_text:null,cur_page:null,init:function(a,b){this.page_text=b;if(null==a||1>a.length)throw"Error pages sent in is null";this.attach_page_events(a)},attach_page_events:function(a){for(var b=0;b<a.length;b++){var c=a[b].toLowerCase();1<c.split("exp").length&&(c="experience");$("#"+c+this.LINK_NAME)[this.EVENT]($.proxy(this.open_link,this,c))}},open_link:function(a){system.load_page(a,{},$.proxy(this.new_page,this,a))},new_page:function(a){window.history.pushState?
window.history.pushState(this.page_text[a].title+a+" page",this.page_text[a].title,"/"+a):window.location.href=window.location.href.split("#")[0]+"#"+a;document.title=this.page_text[a].title;system.page_init(a)}};var start_system=function(){if(window.jasmine)return!0;var a=window.location.href.split("/#").pop();a==window.location.href&&(a=$(".to_load")[0].id);system.init_with(a);return!0},system={SHOW:"<p>\u25b2</p>",HIDE:"<p>\u25bc</p>",NEW_PAGE:null,COLR_BAR:null,init_with:function(a){this.NEW_PAGE=$("#main_box");this.COLR_BAR=$(".page_state");this.pre_page_load();menu.init(constant.pages,constant.page_text);menu.open_link(a)},pre_page_load:function(){$("#small_text_change").mousemove(function(){system.update_text("small",
this)});$("#normal_text_change").mousemove(function(){system.update_text("normal",this)});$("#large_text_change").mousemove(function(){system.update_text("large",this)});system.update_text("normal",$("#normal_text_change")[0])},handle_float:function(){if(utility.browser_that_supports_float(navigator.userAgent))return!1;$("#page_options").css("position","relative").css("float","right").width(290);$("#safety_space").height(0);$("#page_options").offset().top<$(window).height()&&$("#safety_space").height($(window).height()-
$("#page_options").offset().top);return!0},update_text:function(a,b){utility.change_text.to[a]();$('button[id$="text_change"]').each(function(){this.className="text_change"});b&&(b.className="text_change_selected")},page_init:function(a){this.COLR_BAR.attr("id",a);this[a].init();utility.change_text.change_size_by(utility.change_text.current_scale);this.handle_float()},load_page:function(a,b,c){this.NEW_PAGE[0].innerHTML="<center>Loading...<center>";this.NEW_PAGE.load("/"+a,b,c)},home:{init:function(){$("#main_image").each(function(){$(this).attr("src",
$(this).attr("src").replace("_s",""))})}},experience:experience,skills:skills,demos:demos,blog:{init:function(){}}};if(!module)var module={};
module.exports={pages:["Home","Skills","Experience","Demos","Blog"],page_text:{home:{title:"Jacob Friesen - Web Developer",introduction:"Hello, I'm a Computer Science Honours Co-op student from the University of Manitoba.                            Currently I'm in a school term. My specialties are in scripting languages and web development. \t\t\t\t\t\t   I will graduate by April 2013. I have worked in Django, Ruby on Rails, Java (JSF), and Node.js \t\t\t\t\t\t   environments.",specialty_title:"Specialties",
specialties:["JavaScript","HTML/CSS","Full-stack web development"]},skills:{title:"Skills - Jacob Friesen",skill_types:[{name:"Languages",skills:[{name:"HTML/CSS (6 years)",details:"12 months over 3 coop work terms, the rest of may experience mainly comes from my spare time.;Strong Knowlegde of layout intricacies such as vertical positioning of elements without using tables.;Knowlegde of multiple layout styles and how to make scalable layouts;3.5 months experience of doing custom mobile layouts. See winnipegjs.com and this website with your phone.;I know general CSS3 layout techniques like <element>:first-child;I have also spent a few months working with HAML, Jade, SCSS, and Stylus.".split(";")},
{name:"JavaScript (3.5 years) ",details:"12 months over 3 coop work terms, the rest of may experience mainly comes from my spare time.;Strong knowlegde of advanced core concepts in pure Javascript such as Prototypalism and Closures.;Have worked in multiple JS libraries including JQuery and ExtJS, even mobile ones like Titanium's library.;I have also developed some small JQuery plugins and pure JS libraries over the years.;I have spent years dealing with browser incompatability issues including JQuery and pure JavaScript issues,                                 and have gained a strong knowledge of how the DOM works.;Worked on backend JavaScript using Node.js for 3 months on this website and the mobile interface for winnipegjs.com".split(";")},
{name:"Java (3.5 years)",details:["3 years total spent at school working with Java in Desktop projects and Android based devices.","4 months of developing server side code for a mid-sized website.","Knowlegde of OO design and programming in Java including the Model View Controller (MVC) design."]},{name:"XML (1.5 years)",details:["1 year of general and school project experience.","4 months of working with a complex one page website using XML.","Knowlegde of creating well formed XML.","Knowlegde of reading XML files in multiple languages like Javascript and Python."]},
{name:"JSON (1 year)",details:["8 months experience spread over 2 jobs and some experience in university. Additionally I use JSON heavily in the websites I                                 build in my spare time.","Have knowlegde of creating well formed JSON and parsing it in multiple languages."]},{name:"SQL (1 year)",details:["8 months of work experience and 4 months of school experience.","Knowledge of good SQL schema design and querying techniques."]},{name:"Django and Python (8 months)",details:["4 months of school experience and 4 months of work experience at Iders using Django (see experience for more info).",
"Knowledge of good Python techniques such as OO and module loading.","Updated and added components to a Django based website."]},{name:"Ruby and Ruby on Rails (8 months)",details:["4 months of school experience and 4 months of work experience at CanadaDrugs.com, both using Ruby on Rails.","Knowledge of good Ruby techniques such as OO.","Know the architecture and general design patterns of Ruby on Rails web applications."]},{name:"C/C++ (8 months)",details:["Programmed C and C++ code for 4 months on low level school based projects.",
"See aes for an example of a larger c style program I created."]},{name:"Node.js (8 months)",details:["Updated my website from a PHP to Node architecture 8 months ago. I continue to update it.","Designed a mobile interface for winnipegjs.com which runs on Node that included some backend code.","Have worked in pure Node and Express.js architectures."]},{name:"JSP and JSF (4 months)",details:["4 months of designing page GUIs for a mid-sized government website.","Demonstrated knowlegde of how to build scalable and localizable pages."]},
{name:"C# (4 months)",details:["Created and implemented a GUI in 4 months for a school term.","Knowlegde of object oriented design and programming in C#.","Knowlegde of GUI programming and design tools for C#."]},{name:"Basic Knowlegde Of:",details:["Objective C","ZPL","PHP","Assembly","Prolog"]}]},{name:"Tools",skills:[{name:"Eclipse (3 years)",details:["4 months using Eclipse at my first work term and the rest at school","I used Eclipse mainly for standard Java development, including Android development."]},
{name:"Apache HTTP Server (2 years)",details:["Directly managed a server on my first coop work term and for my personal websites.","Know basic admin such as defining document roots in the httpd file."]},{name:"MS Visual Studio (4 months)",details:["4 months of using this tool for C# based for school projects.","Demonstrated knowlegde of GUI design tools."]},{name:"Apache Tomcat (4 months)",details:["Apache Tomcat Web Container (4 months)","Knowlegde of general Tomcat administration; adding users with different privaleges, installing libraries e.g.                                 JSF, configuring server wide variables."]},
{name:"Oracle Glassfish (4 months)",details:[" 4 months of managing the Glassfish server for a mid-sized government website."]},{name:"Other Tool Knowlegde:",details:["VIM","Basic understanding of setup and management of IBM DB2.","Basic photo manipulation in Photoshop.","Intermediate knowledge of Microsoft Office and Open Office."]}]},{name:"Operating Systems",skills:[{name:"Windows XP (9 years)",details:["9 years of using XP.","4 months of usage in large organization developing a mid sized website.",
"Know advanced features like setting environment variables, modifiying the registry etc."]},{name:"Windows Vista and 7 (4 years)",details:["3 years of general usage and admin.","Know some advanced features like setting environment variables."]},{name:"Linux (2.5 years)",details:["2.5 years of general admin and programming experience mainly in Ubuntu including 4 months                                 Ubuntu at my Iders work term.","Some basic CLI experience with Debian and CentOS."]},{name:"Mac OS X (1 year)",
details:["4 months spent programming on Mac OS X at CanadaDrugs.com the rest at school.","Know how to use CLI for basic admin tasks."]}]},{name:"General Skills",skills:[{name:"Web Design (6 years)",details:["Demonstrated knowlegde of creating simple designs that look good. For example this website design is entirely my own design.","I Know how to make webpages look good without any images, which improves webpage performance and maintainability."]},{name:"SEO (4 years)",details:["I have done custom SEO for my websites over the years, currently the term 'Jacob Friesen' brings up one of my websites \t\t\t\t\t\t\t\tfirst in Google.ca. Keep in mind that my name is very common.",
"I Know how to add SEO to a page without comprising user content by using techniques like meta descriptions and keyword \t\t\t\t\t\t\t\tinjection for alt attributes of page elements.","I have a basic knowlegde of how most search engines rank pages like how they rank backlinks highly."]},{name:"Object Orientation (3.5 years)",details:["Demonstrated experience of making clean systems on my work and school terms.","Know basic object oriented design patterns such as the Model View Controller (MVC) design.",
"Have used object orientation in many different programming contexts. This ranges from client side JavaScript                                 to scripting languages like Ruby to compiled languages like Java.","Have knowledge of both class based and prototypal inheritance"]},{name:"Scripting (3.5 years)",details:["Know how to program in an Object Oriented way and the limitations with scripting.","Know how to advanced techniques like metaprogramming and reflection.","Know general variable scoping strategies such as closures and delegates."]},
{name:"Testing (2 years)",details:["Everything I work on that is not simple now is fully tested including personal projects.","I have worked on client side GUI and JavaScript tests, server side tests, desktop application tests and some \t\t\t\t\t\t\t\tlow level C testing.","I know how to use: Selenium (Browser GUI tests), RSpec (Ruby), Test Unit (Ruby), Unittest (Python), JUnit (Java), \t\t\t\t\t\t\t\tJasmine (JavaScript), and QUnit (JavaScript)."]},{name:"Mobile Web Development (8 months)",details:["8 months of initially creating then updating my websites mobile interface",
"Developed the mobile interface for winnipegjs.com","I Know how to develop and test code for multiple environments like Android, iOS, and Windows Phone.","I also know about detecting devices via css media queries, and JavaScript techniques."]},{name:"Other General Skills:",details:["Basic multi-threaded programming.","Basic knowledge of theoretical computer science.","Writing raw printer code (ZPL) and executing it on a printer remotely.","Writing RFID server code (for Motorola one, coded in Python)",
"Working in an Agile environment."]}]}]},experience:{title:"Experience - Jacob Friesen",jobs:[{position:"Web Developer",company:"CanadaDrugs.com",date:"May 2012 - August 2012",details:["Worked on Panda the internal web application that manages most of the business including all of the product ordering \t\t\t\t\t\tcoming from all of the online pharmacy sites. Worked in an Agile Kanban environment.","Used HAML, JavaScript (with lots of JQuery and AJAX), and SCSS to design and update front end interfaces.",
"The backend was coded with Ruby on Rails connecting to a MYSQL database.","Additionally, improved a small internal management application with a Twitter Bootstrap interface and a Ruby on Rails backend.","Most of the code was done in Mac OS X with some basic CLI server admin in CentOS (Linux variant)."]},{position:"Web Developer",company:"Iders",date:"August 2011 - December 2011",details:["Added a new Inventory Location Management system to the current Imformation Management System. This new                         system includes 5 different sections which all had different hardware and software environments.",
"Used ExtJS, AJAX and some HTML/CSS to design the front end interfaces, with backend code mainly in Python \t\t\t\t\t\twith some JavaScript (Titanium Studio Libraries) and ZPL.","Additionally, improved system perfomance in general by a factor of 2 and added a way to save all window placement                         state between sessions. (See the demo description)","All work was done in Ubuntu (Linux variant)."]},{position:"Web Developer",company:"AAFC",date:"January 2011 - April 2011",details:["Redesigned and managed the back end of all the Rural Water Resources Planner website's tools using Java.",
"Redesigned and managed the front end (client side) of the website using a mix of JSF, HTML/CSS, and Javascript.                         The client side development mainly involved designing graphical user interfaces for the website's tools.","Participated in defining user experience, page designs, software architecture and other web application essentials                         for the whole website.","All work was done in Windows."]},{position:"Crew Member",company:"Wendy's",date:"May 2010 - August 2010"},
{position:"Landscaper",company:"Little Bud's Tree Farm",date:"June 2009 - August 2009"}]},demos:{title:"Demos - Jacob Friesen",introduction:"These are samples of school and work term programs I built. Due to the legal or practical nature of some of these demos,                            not all components of them are downloadable/viewable. Click on an image to see a larger version.",demos:[{name:"Winnipeg JS Mobile Interface",description:"In late December 2012 I developed the mobile interface for winnipegjs.com. Using the desktop design as a baseline, I used CSS \t\t\t\t\t\t\t\t  and some some JavaScript to make the interface look good and work well across multiple devices. For detecting misbehaving browsers \t\t\t\t\t\t\t\t  like IE 7 on Windows Phone 7, I used tactics like IE includes and user agent sniffing. Most of the JavaScript was done server side \t\t\t\t\t\t\t\t  (the website is implemented in Node.js) to set and detect cookies so mobile browsers would be able to switch to desktop and vice versa.",
image:["images/winnipegjs_s.png","Winnipeg JS mobile interface picture"],links:[{link_text:"Website (View with mobile browser): ",link:["http://winnipegjs.com","Winnipeg JS user group's website"]},{link_text:"Source: ",link:["https://github.com/yagudaev/winnipegjs","Winnipeg JS website source code"]}]},{name:"Iders IMS Website",description:"In the Fall coop term of 2011 I worked on the information management website at Iders with some other Web Developers. \t\t\t\t\t    The below video is about an additional feature I implemented, that is automatically opening the windows you had open \t\t\t\t\t    from last session in your new session. Keep in mind this is a web interface.",
image:["images/IdersIMS2_s.png","Iders IMS2 Screen Picture"],links:[{link_text:"Video (Flash): ",link:["http://www.youtube.com/watch?v=1tB5szfXYCo","Jacob Friesen demonstrating IMS2 auto window session loading"]}]},{name:"AES Implementation",description:"In Cryptography in the fall school term of 2012 I implemented AES in C++. The implementation is large enough to include \t\t\t\t\tsome complexity and demonstrates my ability to code in a C environment. Since the code closely follows the AES specification the \t\t\t\t\timplementation was done in a bottom up C style rather than a top down C++ style. See the README for instructions.",
image:["images/aes_s.png","AES Picture"],links:[{link_text:"Github Source: ",link:["https://github.com/Jacob-Friesen/aes_implementation","Jacob Friesen's AES implementation"]}]},{name:"Nutrifacts Project",description:"In the Summer school term of 2011 I worked on this project along with 3 other group members. The application uses a                                   database of food items with associated nutritional facts in conjuction with a Java based framework of objects to track                                   user preferences. These preferences are in the form of ratings which influence along with the filters the suggested                                   items for each item selected.",
image:["images/nutrifactsMainScreen_s.jpg","Nutrifacts main screen picture"],links:[{link_text:"Java Source Code (Zipped): ",link:["http://www.jacobfriesen.com/downloads/nutrifacts.zip","Jacob Friesen Nutrifacts Project Download"]}]},{name:"RWRP Website",description:"This is the website I helped design while at my first work term. As the experience section states I worked on all parts                                   of the website; design, front end, and back end. I have included a video demoing one of the features I worked on as a \t\t\t\t\t    link below.",
image:["images/RWRPMain_s.jpg","RWRP website picture"],links:[{link_text:"Video (Flash): ",link:["http://www.youtube.com/watch?v=hV-JQ9dC2nI","Jacob Friesen demonstrating the RWRP website"]}]},{name:"Movie Organizer",description:"This is an application that manages a database of movies for a user. The user can create, add or edit any movie. Movies                                   have data about their title, director(s), actors, description etc. This project was designed with another student for my                                   Human Computer Interaction course. The focus was on user interaction not developing an entire application so the database                                   is just an XML file and there may be some small display glitches.",
image:["images/movOrgPic_s.jpg","Jacob Friesen Movie Organizer Picture"],links:[{link_text:"C# Source Code (Zipped): ",link:["http://www.jacobfriesen.com/downloads/MovieOrganizerSource.zip","Jacob Friesen Movie Organizer Download"]}]},{name:"Doctor Scheduling Project",description:"This program schedules patients into a hospital. They are scheduled based on thier condition severity and when the available                                   resources to treat them are ready. There are 2 types of resources: doctors and the rooms the patient is operated in. If two                                   patients have the same condition the first one that requests treatment is treated first. This project was done for my Object                                   Orientation (Comp 2150) course.",
image:["images/schedulingHsptl_s.jpg","Jacob Friesen Doctor Scheduling Picture"],links:[{link_text:"Java Source Code (Zipped): ",link:["http://www.jacobfriesen.com/downloads/schedulePatients.zip","Jacob Friesen Patient Scheduler Download"]}]},{name:"Contact List Project",description:"This is a GUI application that manages various contacts a person could have. The contact info includes variables like phone                                   numbers which is read from a XML file. Using this application you can add, delete or edit any entry clicked on in the list                                   display. This was done as part of an assignment I had in my current Human Computer Interaction course.",
image:["images/contactList_s.jpg","Jacob Friesen Contact List Picture"],links:[{link_text:"C# Source Code (Zipped): ",link:["http://www.jacobfriesen.com/downloads/contactList.zip","Jacob Friesen Contact List Download"]}]}]},blog:{title:"Blog - Jacob Friesen",introduction:"Coming soon..."}}};var constant=module.exports;