describe("Utility", function() {
    /**
     * 1. All returning self tests are implicit.
     **/
    beforeEach(function(){
        test = {}
    });
    
    describe("attach_show_events", function() {
        
        describe("init", function(){
            
            it("all arguments sent in should be set", function() {
                var before = utility.attach_events;
                utility.attach_events = null;
                
                var test_f = function(){return true}
                show_object = utility.attach_show_events({triggers: test_f, event: "b", collapsers: "c", delay: true, on_hide: "d", on_show: "e", chk_attr: "f"});
                
                expect(show_object.triggers).toBe(test_f);
                expect(show_object.event).toBe("b");
                expect(show_object.collapsers).toBe("c");
                expect(show_object.on_hide).toBe("d");
                expect(show_object.on_show).toBe("e");
                expect(show_object.chk_attr).toBe("f");
                
                utility.attach_events = before;
            });
        });
        
         describe("order_matchers_by_name", function(){
            beforeEach(function(){
                local = {};
                local.divs = [];
                for (d = 0; d < 5; d++)
                    local.divs.push($('<div name='+d+'/>')[0]);
            });
            
            it("should set triggers and collapsers to null if both were already null", function() {
                show_object = utility.attach_show_events({triggers: null, event: "b", collapsers: null, delay: true});
                show_object.order_matchers_by_name();
                
                expect(show_object.triggers).toBe(null);
                expect(show_object.collapsers).toBe(null);
            });
            
            it("should set triggers and collapsers to themselves if they are single item lists", function() {
                show_object = utility.attach_show_events({triggers: local.divs[0], event: "b", collapsers: local.divs[0], delay: true});
                show_object.order_matchers_by_name();
                
                expect(show_object.triggers).toBe(local.divs[0]);
                expect(show_object.collapsers).toBe(local.divs[0]);
            });
            
            it("should raise an error both lists are not the same length", function() {
                var triggers = [local.divs[3], local.divs[1], local.divs[4], local.divs[0], local.divs[2]];
                var collapsers = [local.divs[2], local.divs[3], local.divs[0], local.divs[4]];
                
                show_object = utility.attach_show_events({triggers: triggers, event: "b", collapsers: collapsers, delay: true});
                expect(function(){  show_object.order_matchers_by_name(); }).toThrow();
            });
            
            it("should order both lists", function() {
                var triggers = [local.divs[3], local.divs[1], local.divs[4], local.divs[0], local.divs[2]];
                var collapsers = [local.divs[2], local.divs[3], local.divs[0], local.divs[4], local.divs[1]];
                
                show_object = utility.attach_show_events({triggers: triggers, event: "b", collapsers: collapsers, delay: true});
                show_object.order_matchers_by_name();

                for (t = 0; t < show_object.triggers.length; t++)
                    expect( $(show_object.triggers[t]).attr('name') ).toBe( $(local.divs[t]).attr('name') );
                for (c = 0; c < show_object.triggers.length; c++)
                    expect( $(show_object.collapsers[c]).attr('name') ).toBe( $(local.divs[c]).attr('name') );
            });
            
        });
         
        describe("attach_events", function(){
            beforeEach(function(){
                local = {};
                local.divs = [];
                for (d = 0; d < 5; d++)
                    local.divs.push($('<div class="trigger" name='+d+'/>')[0]);
                for (d = 0; d < 5; d++)
                    local.divs.push($('<div class="collapser" name='+d+'/>')[0]);
            });
            
            it("should attach the collapsers to the corresponding triggers", function() {
                var triggers = [local.divs[1], local.divs[0]];
                var collapsers = [local.divs[0], local.divs[1]];
                
                show_object = utility.attach_show_events({triggers: triggers, event: "click", collapsers: collapsers, delay: true});
                show_object.attach_events();

                for (t = 0; t < show_object.triggers.length; t++)
                    expect(show_object.triggers[t].collapser).toBe(show_object.collapsers[t]);
            });
            
            it("should attach the collapsers to the corresponding triggers that match only", function() {
                var triggers = [local.divs[1], local.divs[0], local.divs[3], local.divs[4]];
                var collapsers = [local.divs[0], local.divs[1], local.divs[2], local.divs[3]];
                
                show_object = utility.attach_show_events({triggers: triggers, event: "click", collapsers: collapsers, delay: true});
                show_object.attach_events();

                var c_list = [0, 1, 3];
                for (t = 0; t < show_object.triggers.length - 1; t++)
                    expect( $(show_object.triggers[t].collapser).attr('name') ).toBe( $(show_object.collapsers[c_list[t]]).attr("name") );
                
                // position 4 is not assigned because it had no corresponding element
                expect(show_object.triggers[3].collapser).toBeFalsy();
            });
            
            it("should call the hide function the trigger is clicked on and the corresponding collapser is not displayed", function() {
                var triggers = [local.divs[0]];
                var collapsers = [$('<div style="display: none;" name="0"/>')[0]];
                
                var hidden = false;
                show_object = utility.attach_show_events({
                    triggers: triggers,
                    event: "click",
                    collapsers: collapsers,
                    delay: true,
                    on_show: function(){
                        hidden = true;
                    }
                });
                
                show_object.attach_events();
                $(show_object.triggers[0]).click();
                expect(hidden).toBe(true);
            });
            
            it("should call the show function the trigger is clicked on and the corresponding collapser is displayed", function() {
                var triggers = [local.divs[0]];
                var collapsers = [$('<div style="display: inline;" name="0"/>')[0]];
                
                var shown = false;
                show_object = utility.attach_show_events({
                    triggers: triggers,
                    event: "click",
                    collapsers: collapsers,
                    delay: true,
                    on_hide: function(){
                        shown = true;
                    }
                });
                
                show_object.attach_events();
                show_object.triggers[0].click();
                expect(shown).toBe(true);
            });
            
        });
    });
    
    // There are a lot of tests for this because small changes in certian browsers user strings could possible wreck this.
    describe("browser_that_supports_float", function() {
        it("should return true when the user agent string is null", function(){
            expect(utility.browser_that_supports_float(null)).toBe(true);
        });
        
        it("should return true when the user agent string is empty", function(){
            expect(utility.browser_that_supports_float('')).toBe(true);
        });
        
        it("should return true when the user agent string is from firefox", function(){
            expect(utility.browser_that_supports_float('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:12.0) Gecko/20100101 Firefox/12.0')).toBe(true);
        });
        
        it("should return true when the user agent string is from desktop safari", function(){
            expect(utility.browser_that_supports_float('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3')).toBe(true);
        });
        
        it("should return true when the user agent string is from modern mobile safari", function(){
            expect(utility.browser_that_supports_float('Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3')).toBe(true);
        });
        
        it("should return false when the user agent string is from old < 5 mobile safari", function(){
            expect(utility.browser_that_supports_float('UserAgent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5')).toBe(false);
        });
    });
});