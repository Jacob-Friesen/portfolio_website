if (!module) var module = {}
module.exports = {
    pages: [
        "Home",
        "Skills",
        "Experience",
        "Demos",
        "Blog"
    ],
    
    page_text: {
        home: {
            title: "Jacob Friesen - Web Developer",
            introduction: "Hello, I'm a Computer Science Honours Co-op student from the University of Manitoba. \
                           Currently I'm in a school term. My specialties are in scripting languages and web development. \
						   I will graduate by April 2013. I have worked in Django, Ruby on Rails, Java (JSF), and Node.js \
						   environments.",
			specialty_title: "Specialties",
			specialties: [
				"JavaScript",
				"HTML/CSS",
				"Full-stack web development"
			]
        },
        
        skills: {
            title: "Skills - Jacob Friesen",
            skill_types: [
                {
                    name: "Languages",
                    skills: [
                        {
                            name: "HTML/CSS (6 years)",
                            details: [
                                "12 months over 3 coop work terms, the rest of may experience mainly comes from my spare time.",
                                "Strong Knowlegde of layout intricacies such as vertical positioning of elements without using tables.",
                                "Knowlegde of multiple layout styles and how to make scalable layouts",
                                "3.5 months experience of doing custom mobile layouts. See winnipegjs.com and this website with your phone.",
								"I know general CSS3 layout techniques like <element>:first-child",
                                "I have also spent a few months working with HAML, Jade, SCSS, and Stylus."
                            ]
                        },
                        {
                            name: "JavaScript (3.5 years) ",
                            details: [
                                "12 months over 3 coop work terms, the rest of may experience mainly comes from my spare time.",
                                "Strong knowlegde of advanced core concepts in pure Javascript such as Prototypalism and Closures.",
                                "Have worked in multiple JS libraries including JQuery and ExtJS, even mobile ones like Titanium's library.",
                                "I have also developed some small JQuery plugins and pure JS libraries over the years.",
                                "I have spent years dealing with browser incompatability issues including JQuery and pure JavaScript issues, \
                                and have gained a strong knowledge of how the DOM works.",
                                "Worked on backend JavaScript using Node.js for 3 months on this website and the mobile interface for winnipegjs.com"
                            ]
                        },
                        {
                            name: "Java (3.5 years)",
                            details: [
                                "3 years total spent at school working with Java in Desktop projects and Android based devices.",
                                "4 months of developing server side code for a mid-sized website.",
                                "Knowlegde of OO design and programming in Java including the Model View Controller (MVC) design."
                            ]
                        },
                        {
                            name: "XML (1.5 years)",
                            details: [
                                "1 year of general and school project experience.",
                                "4 months of working with a complex one page website using XML.",
                                "Knowlegde of creating well formed XML.",
                                "Knowlegde of reading XML files in multiple languages like Javascript and Python."
                            ]
                        },
                        {
                            name: "JSON (1 year)",
                            details: [
                                "8 months experience spread over 2 jobs and some experience in university. Additionally I use JSON heavily in the websites I \
                                build in my spare time.",
                                "Have knowlegde of creating well formed JSON and parsing it in multiple languages."
                            ]
                        },
                        {
							name: "SQL (1 year)",
							details: [
							"8 months of work experience and 4 months of school experience.",
							"Knowledge of good SQL schema design and querying techniques."
							]
                        },
                        {
                            name: "Django and Python (8 months)",
                            details: [
                                "4 months of school experience and 4 months of work experience at Iders using Django (see experience for more info).",
                                "Knowledge of good Python techniques such as OO and module loading.",
								"Updated and added components to a Django based website."
                            ]
                        },
                        {
							name: "Ruby and Ruby on Rails (8 months)",
							details: [
								"4 months of school experience and 4 months of work experience at CanadaDrugs.com, both using Ruby on Rails.",
								"Knowledge of good Ruby techniques such as OO.",
								"Know the architecture and general design patterns of Ruby on Rails web applications."
							]
						},
						{
                            name: "C/C++ (8 months)",
                            details: [
                                "Programmed C and C++ code for 4 months on low level school based projects.",
								"See aes for an example of a larger c style program I created."
                            ]
                        },
						{
                            name: "Node.js (8 months)",
                            details: [
                                "Updated my website from a PHP to Node architecture 8 months ago. I continue to update it.",
								"Designed a mobile interface for winnipegjs.com which runs on Node that included some backend code.",
								"Have worked in pure Node and Express.js architectures."
                            ]
                        },
                        {
                            name: "JSP and JSF (4 months)",
                            details: [
                                "4 months of designing page GUIs for a mid-sized government website.",
                                "Demonstrated knowlegde of how to build scalable and localizable pages."
                            ]
                        },
                        {
                            name: "C# (4 months)",
                            details: [
                                "Created and implemented a GUI in 4 months for a school term.",
                                "Knowlegde of object oriented design and programming in C#.",
                                "Knowlegde of GUI programming and design tools for C#."
                            ]
                        },
                        {
                            name: "Basic Knowlegde Of:",
                            details: [
                            	"Objective C",
                            	"ZPL",
                                "PHP",
                                "Assembly",
								"Prolog"
                            ]
                        }
                        
                    ]
                },
                {
                    name: "Tools",
                    skills: [
                        {
                            name: "Eclipse (3 years)",
                            details: [
                                "4 months using Eclipse at my first work term and the rest at school",
                                "I used Eclipse mainly for standard Java development, including Android development."
                            ]
                        },
                        {
							name: "Apache HTTP Server (2 years)",
							details: [
								"Directly managed a server on my first coop work term and for my personal websites.",
								"Know basic admin such as defining document roots in the httpd file."
							]
                        },
                        {
                            name: "MS Visual Studio (4 months)",
                            details: [
                                "4 months of using this tool for C# based for school projects.",
                                "Demonstrated knowlegde of GUI design tools."
                            ]
                        },
                        {
                            name: "Apache Tomcat (4 months)",
                            details: [
                                "Apache Tomcat Web Container (4 months)",
                                "Knowlegde of general Tomcat administration; adding users with different privaleges, installing libraries e.g. \
                                JSF, configuring server wide variables."
                            ]
                        },
                        {
                            name: "Oracle Glassfish (4 months)",
                            details: [
                                " 4 months of managing the Glassfish server for a mid-sized government website."
                            ]
                        },
                        {
                            name: "Other Tool Knowlegde:",
                            details: [
                            	"VIM",
                                "Basic understanding of setup and management of IBM DB2.",
                                "Basic photo manipulation in Photoshop.",
                                "Intermediate knowledge of Microsoft Office and Open Office."
                            ]
                        }
                    ]
                },
                {
                    name: "Operating Systems",
                    skills: [
                        {
                            name: "Windows XP (9 years)",
                            details: [
                                "9 years of using XP.",
                                "4 months of usage in large organization developing a mid sized website.",
                                "Know advanced features like setting environment variables, modifiying the registry etc."
                            ]
                        },
                        {
                            name: "Windows Vista and 7 (4 years)",
                            details: [
                                "3 years of general usage and admin.",
                                "Know some advanced features like setting environment variables."
                            ]
                        },
                        {
                            name: "Linux (2.5 years)",
                            details: [
                                "2.5 years of general admin and programming experience mainly in Ubuntu including 4 months \
                                Ubuntu at my Iders work term.",
                                "Some basic CLI experience with Debian and CentOS."
                            ]
                        },
                        {
                            name: "Mac OS X (1 year)",
                            details: [
                                "4 months spent programming on Mac OS X at CanadaDrugs.com the rest at school.",
                                "Know how to use CLI for basic admin tasks."
                            ]
                        }
                    ]
                },
                {
                    name: "General Skills",
                    skills: [
                    	{
							name: "Web Design (6 years)",
							details: [
								"Demonstrated knowlegde of creating simple designs that look good. For example this website design is entirely my own design.",
								"I Know how to make webpages look good without any images, which improves webpage performance and maintainability."
							]
						},
						{
							name: "SEO (4 years)",
							details: [
								"I have done custom SEO for my websites over the years, currently the term 'Jacob Friesen' brings up one of my websites \
								first in Google.ca. Keep in mind that my name is very common.",
								"I Know how to add SEO to a page without comprising user content by using techniques like meta descriptions and keyword \
								injection for alt attributes of page elements.",
								"I have a basic knowlegde of how most search engines rank pages like how they rank backlinks highly."
							]
                        },
                        {
                            name: "Object Orientation (3.5 years)",
                            details: [
                                "Demonstrated experience of making clean systems on my work and school terms.",
                                "Know basic object oriented design patterns such as the Model View Controller (MVC) design.",
                                "Have used object orientation in many different programming contexts. This ranges from client side JavaScript \
                                to scripting languages like Ruby to compiled languages like Java.",
                                "Have knowledge of both class based and prototypal inheritance"
                            ]
                        },
                        {
							name: "Scripting (3.5 years)",
							details: [
								"Know how to program in an Object Oriented way and the limitations with scripting.",
								"Know how to advanced techniques like metaprogramming and reflection.",
								"Know general variable scoping strategies such as closures and delegates."
							]
                        },
                        {
							name: "Testing (2 years)",
							details: [
								"Everything I work on that is not simple now is fully tested including personal projects.",
								"I have worked on client side GUI and JavaScript tests, server side tests, desktop application tests and some \
								low level C testing.",
								"I know how to use: Selenium (Browser GUI tests), RSpec (Ruby), Test Unit (Ruby), Unittest (Python), JUnit (Java), \
								Jasmine (JavaScript), and QUnit (JavaScript)."
							]
                        },
						{
							name: "Mobile Web Development (8 months)",
							details: [
								"8 months of initially creating then updating my websites mobile interface",
								"Developed the mobile interface for winnipegjs.com",
								"I Know how to develop and test code for multiple environments like Android, iOS, and Windows Phone.",
								"I also know about detecting devices via css media queries, and JavaScript techniques."
							]
                        },
                        {
                            name: "Other General Skills:",
                            details: [
                                "Basic multi-threaded programming.",
                                "Basic knowledge of theoretical computer science.",
                                "Writing raw printer code (ZPL) and executing it on a printer remotely.",
                                "Writing RFID server code (for Motorola one, coded in Python)",
                                "Working in an Agile environment."
                            ]
                        }
                    ]
                }
            ]
        },
        
        experience: {
            title: "Experience - Jacob Friesen",
            jobs: [
				{
                    position: "Web Developer",
                    company: "CanadaDrugs.com",
                    date: "May 2012 - August 2012",
                    details: [
                        "Worked on Panda the internal web application that manages most of the business including all of the product ordering \
						coming from all of the online pharmacy sites. Worked in an Agile Kanban environment.",
                        "Used HAML, JavaScript (with lots of JQuery and AJAX), and SCSS to design and update front end interfaces.",
                        "The backend was coded with Ruby on Rails connecting to a MYSQL database.",
                        "Additionally, improved a small internal management application with a Twitter Bootstrap interface and a Ruby on Rails backend.",
						"Most of the code was done in Mac OS X with some basic CLI server admin in CentOS (Linux variant)."
                    ]
                },
                {
                    position: "Web Developer",
                    company: "Iders",
                    date: "August 2011 - December 2011",
                    details: [
                        "Added a new Inventory Location Management system to the current Imformation Management System. This new \
                        system includes 5 different sections which all had different hardware and software environments.",
                        "Used ExtJS, AJAX and some HTML/CSS to design the front end interfaces, with backend code mainly in Python \
						with some JavaScript (Titanium Studio Libraries) and ZPL.",
                        "Additionally, improved system perfomance in general by a factor of 2 and added a way to save all window placement \
                        state between sessions. (See the demo description)",
						"All work was done in Ubuntu (Linux variant)."
                    ]
                },
                {
                    position: "Web Developer",
                    company: "AAFC",
                    date: "January 2011 - April 2011",
                    details: [
                        "Redesigned and managed the back end of all the Rural Water Resources Planner website's tools using Java.",
                        "Redesigned and managed the front end (client side) of the website using a mix of JSF, HTML/CSS, and Javascript. \
                        The client side development mainly involved designing graphical user interfaces for the website's tools.",
                        "Participated in defining user experience, page designs, software architecture and other web application essentials \
                        for the whole website.",
						"All work was done in Windows."
                    ]
                },
                {
                    position: "Crew Member",
                    company: "Wendy's",
                    date: "May 2010 - August 2010"
                },
                {
                    position: "Landscaper",
                    company: "Little Bud's Tree Farm",
                    date: "June 2009 - August 2009"
                }
            ]
        },
        
        demos: {
            title: "Demos - Jacob Friesen",
            introduction: "These are samples of school and work term programs I built. Due to the legal or practical nature of some of these demos, \
                           not all components of them are downloadable/viewable. Click on an image to see a larger version.",
            demos: [
				{
                    name: "Winnipeg JS Mobile Interface",
                    description: "In late December 2012 I developed the mobile interface for winnipegjs.com. Using the desktop design as a baseline, I used CSS \
								  and some some JavaScript to make the interface look good and work well across multiple devices. For detecting misbehaving browsers \
								  like IE 7 on Windows Phone 7, I used tactics like IE includes and user agent sniffing. Most of the JavaScript was done server side \
								  (the website is implemented in Node.js) to set and detect cookies so mobile browsers would be able to switch to desktop and vice versa.",
                    image: ["images/winnipegjs_s.png", "Winnipeg JS mobile interface picture"],
					links: [
						{
							link_text: 'Website (View with mobile browser): ',
							link: ["http://winnipegjs.com", "Winnipeg JS user group's website"]
						},
						{
							link_text: 'Source: ',
							link: ["https://github.com/yagudaev/winnipegjs", "Winnipeg JS website source code"]
						}
					]
                },
                {
                    name: "Iders IMS Website",
                    description: "In the Fall coop term of 2011 I worked on the information management website at Iders with some other Web Developers. \
					    The below video is about an additional feature I implemented, that is automatically opening the windows you had open \
					    from last session in your new session. Keep in mind this is a web interface.",
                    image: ["images/IdersIMS2_s.png", "Iders IMS2 Screen Picture"],
					links: [
						{
							link_text: 'Video (Flash): ',
							link: ["http://www.youtube.com/watch?v=1tB5szfXYCo", "Jacob Friesen demonstrating IMS2 auto window session loading"]
						}
					]
                },
				{
                    name: "AES Implementation",
                    description: "In Cryptography in the fall school term of 2012 I implemented AES in C++. The implementation is large enough to include \
					some complexity and demonstrates my ability to code in a C environment. Since the code closely follows the AES specification the \
					implementation was done in a bottom up C style rather than a top down C++ style. See the README for instructions.",
                    image: ["images/aes_s.png", "AES Picture"],
					links: [
						{
							link_text: 'Github Source: ',
							link: ["https://github.com/Jacob-Friesen/aes_implementation", "Jacob Friesen's AES implementation"]
						}
					]
                },
                {
                    name: "Nutrifacts Project",
                    description: "In the Summer school term of 2011 I worked on this project along with 3 other group members. The application uses a \
                                  database of food items with associated nutritional facts in conjuction with a Java based framework of objects to track \
                                  user preferences. These preferences are in the form of ratings which influence along with the filters the suggested \
                                  items for each item selected.",
                    image: ["images/nutrifactsMainScreen_s.jpg", "Nutrifacts main screen picture"],
					links: [
						{
							link_text: 'Java Source Code (Zipped): ',
							link: ["http://www.jacobfriesen.com/downloads/nutrifacts.zip", "Jacob Friesen Nutrifacts Project Download"]
						}
					]
                },
                {
                    name: "RWRP Website",
                    description: "This is the website I helped design while at my first work term. As the experience section states I worked on all parts \
                                  of the website; design, front end, and back end. I have included a video demoing one of the features I worked on as a \
					    link below.",
                    image: ["images/RWRPMain_s.jpg", "RWRP website picture"],
					links: [
						{
							link_text: 'Video (Flash): ',
							link: ["http://www.youtube.com/watch?v=hV-JQ9dC2nI", "Jacob Friesen demonstrating the RWRP website"]
						}
					]
                },
                {
                    name: "Movie Organizer",
                    description: "This is an application that manages a database of movies for a user. The user can create, add or edit any movie. Movies \
                                  have data about their title, director(s), actors, description etc. This project was designed with another student for my \
                                  Human Computer Interaction course. The focus was on user interaction not developing an entire application so the database \
                                  is just an XML file and there may be some small display glitches.",
                    image: ["images/movOrgPic_s.jpg", "Jacob Friesen Movie Organizer Picture"],
					links: [
						{
							link_text: 'C# Source Code (Zipped): ',
							link: ["http://www.jacobfriesen.com/downloads/MovieOrganizerSource.zip", "Jacob Friesen Movie Organizer Download"]
						}
					]
                },
                {
                    name: "Doctor Scheduling Project",
                    description: "This program schedules patients into a hospital. They are scheduled based on thier condition severity and when the available \
                                  resources to treat them are ready. There are 2 types of resources: doctors and the rooms the patient is operated in. If two \
                                  patients have the same condition the first one that requests treatment is treated first. This project was done for my Object \
                                  Orientation (Comp 2150) course.",
                    image: ["images/schedulingHsptl_s.jpg", "Jacob Friesen Doctor Scheduling Picture"],
					links: [
						{
							link_text: 'Java Source Code (Zipped): ',
							link: ["http://www.jacobfriesen.com/downloads/schedulePatients.zip", "Jacob Friesen Patient Scheduler Download"]
						}
					]
                },
                {
                    name: "Contact List Project",
                    description: "This is a GUI application that manages various contacts a person could have. The contact info includes variables like phone \
                                  numbers which is read from a XML file. Using this application you can add, delete or edit any entry clicked on in the list \
                                  display. This was done as part of an assignment I had in my current Human Computer Interaction course.",
                    image: ["images/contactList_s.jpg", "Jacob Friesen Contact List Picture"],
					links: [
						{
							link_text: 'C# Source Code (Zipped): ',
							link: ["http://www.jacobfriesen.com/downloads/contactList.zip", "Jacob Friesen Contact List Download"]
						}
					]
                }
            ]
        },
        
        blog: {
            title: "Blog - Jacob Friesen",
            introduction: "Coming soon..."
        }
    }
}
var constant = module.exports;// make it easy to access client side
