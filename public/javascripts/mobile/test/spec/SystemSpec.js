describe("System", function() {
    /**
     * - Image setting doesn't need to be tested due to Selenium testing most image openings
     * - Loading pages is already tested by the open_link in MenuSpec
     * - Home specific test is immediatly visible so can just do a visual test
     **/
    
    describe("init_with", function() {
        beforeEach(function(){
            constant = {
                pages: 'one',
                page_text: 'two'
            };
            
            system.NEW_PAGE = null;
            system.COLR_BAR = null;
        });
        
        it("should set a the NEW_PAGE element to be a JQuery object", function() {
            test_element_exists($('<div id="main_box"/>'), 'NEW_PAGE', '#main_box');
        });
        
        it("should set a the COLR_BAR element to be a JQuery object", function() {
            test_element_exists($('<div class="page_state"/>'), 'COLR_BAR', '.page_state');
        });
        
        it("should call the initializer for the menu", function() {
            spyOn(menu, "open_link");
            
            test_function_called_with(menu,'init', [constant.pages, constant.page_text], function(){
                system.init_with('home');
            });
        });
        
        it("should call the open a page in the menu", function() {
            spyOn(menu, "init");
            
            test_function_called_with(menu,'open_link', ['home'], function(){
                system.init_with('home');
            });
        });
        
        function test_element_exists(element, sys_variable, remove_selector) {
            spyOn(menu, "init");
            spyOn(menu, "open_link");
            
            var new_main = element;
            $(document.body).append(new_main);
            
            system.init_with('home');
            expect(system[sys_variable][0] == new_main[0]).toBe(true);
            
            $(remove_selector).detach();
        }
    });
    
    describe("page_init", function() {
        beforeEach(function(){
            system.COLR_BAR = null;
        });
        
        it("should set the COLR_BAR to the page id (css recolor)", function() {
            spyOn(system.home, "init");
            
            var new_main = $('<div class="page_state"/>');
            $(document.body).append(new_main);
            system.COLR_BAR = new_main;
            
            system.page_init('home');
            expect(system.COLR_BAR.attr('id')).toBe('home');
            
            $('.page_state').detach();
        });
    });
    
    /** UTIL **/
    // sees if the function to call is calling by_calling with args
    function test_function_called_with(call_on, to_call, args, by_calling){
        var before = call_on[to_call];
        
        // Set up function to check if called
        var args_parent = args;
        call_on[to_call] = function call_check(){
            call_check.called = arrays_equal(arguments, args_parent);
        };
        
        // call function later to check
        by_calling();
        expect(call_on[to_call].called).toBe(true);
        
        to_call = before;
    }
    function arrays_equal(arr1, arr2){
        for (a in arr1){
            if(arr1[a] !== arr2[a])
                return false;
        }
        return true;
    }
});