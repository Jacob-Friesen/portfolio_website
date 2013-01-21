describe("Menu", function() {
    describe("init", function() {
        it("should throw an error when null pages are sent in", function() {
            expect(function(){ menu.init(null, 'some text') }).toThrow();
        });
        
        it("should throw an error when empty pages are sent in", function() {
            expect(function(){ menu.init([], 'some text') }).toThrow();
        });
        
        it("should set page_text on init", function() {
            menu.init(['one','two'], 'some text');
            expect(menu.page_text).toEqual('some text');
        });
        
        it("should attach a this.EVENT to all pages", function() {
            var pages = ["1","2","3","4","5"];
            for (p in pages)
                $(document.body).append($('<div id='+pages[p]+menu.LINK_NAME+'/>'));
                
            menu.init(pages, 'some text');
            for (p = 0; p < pages.length; p++){
                expect( $('#'+pages[p]+menu.LINK_NAME).data('events') ).toBeTruthy();
                $('#'+pages[p]+menu.LINK_NAME).remove();
            }
        });
    });
    
    describe("open_link", function() {
        it("should call new_page", function(){
            system.NEW_PAGE = $('<div />');
            
            var before = menu.new_page;
            var called = true;
            menu.new_page = function(){ called = false;}
            
            menu.open_link('home');//must be valid url so use home url
            expect(called).toBe(true);
            
            menu.new_page = before;//cleanup
        });
    });
    
    describe("new_page", function() {
        beforeEach(function() {
            spyOn(system, 'page_init');
           
            menu.page_text = {
                home: {
                    title: 'home_title'
                }
            };
        });
        
        afterEach(function(){
            menu.page_text = null;
            window.history.pushState('test_page', 'test_page', '/test');
            window.document.title = "Jasmine Spec Runner";
        });
        
        it("should update the pages address to append a /page", function(){
            menu.new_page('home');
            expect(window.location.href.split('/home').length).toBeTruthy();
            expect(window.location.href.split('/home').length).toBe(2);
        });
        
        it("should update the pages address to append a #page if window.history.pushState is not present", function(){
            var before =  window.history.pushState;
            window.history.pushState = null;// null simulates not present
            
            menu.new_page('home');
            expect(window.location.href.split('#home').length).toBeTruthy();
            expect(window.location.href.split('#home').length).toBe(2);
            
            window.history.pushState = before;
        });
        
        it("should set document title to be the same as specified by the pages page text", function(){
            menu.new_page('home');
            expect(document.title).toBe('home_title');
        });
        
        it("should initialize the page", function(){
            menu.new_page('home');
            expect(system.page_init).toHaveBeenCalledWith('home');
        });
    });
});