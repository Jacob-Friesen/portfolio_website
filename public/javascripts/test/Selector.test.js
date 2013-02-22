var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();
    Selector = Portfolio.selector;

// globals that Mocha won't complain about
mocha.setup({globals: ['toString', 'constructor']});

// resets body so that only the mocha tag is left
function reset_body(){
    $(document.body).children(":not(#mocha)").remove();
}

function reset_head(){
    $(document.head).children("link:not(link[href$='mocha.css'])").remove();
}

// These tests are a little loose, direct GUI tests via Selenium cover the gaps
describe('Selector', function() {
    describe('#ajax_load()', function() {
        it('should not load when null is sent', function(done) {
            var loaded = false;
            Selector.ajax_load(null, null, function(){
                assert.equal(1, 2);// cause a failure
            });
            
            setTimeout(function (){
                done();
            }, 100)
        })
        
        it('should load a valid file via GET', function(done) {
            Selector.ajax_load('GET', '/stylesheets/mocha.css', function(){
                done();
            });
        })
        
        it('should load a valid file via POST', null)
        
        it('should load the contents of a valid file and return the contents in the callback', function(done){
            Selector.ajax_load('GET', '/stylesheets/mocha.css', function(response){
                assert.equal(response.length > 0, true);
                done();
            });
        })
    });
    
    describe('#add_cache()', function() {
        it('adds a cache of specified name to the page with the specified data', function(){
            Selector.add_cache('test', 'test_data');
            assert.equal($('#test_cache')[0].innerHTML, 'test_data');
        })
        
        it('doesn\'t add a cache when one is already present', function(){
            Selector.add_cache('test', 'test_data');
            Selector.add_cache('test', 'test_data2');
            assert.equal($('#test_cache').length, 1);
            assert.equal($('#test_cache')[0].innerHTML, 'test_data');
        })
    });
    
    describe('#load_pages()', function() {
        beforeEach(function(){
            Selector.loaded.pages = 0;
            
            // no ajax just call the data
            sinon.stub(Selector , 'ajax_load', function (mode, page, callback) {
                callback('test');
                return true;
            });
            
            // cannot update the innerHTML of the body, causes mocha to crash
            sinon.stub(Selector , 'add_to_body', function (text) { return true });
            
            // So the correct locations are retrieved
            Selector.INDEX_PAGE = "/" + Selector.INDEX_PAGE;
            Selector.address = {
                pathname: undefined,
                toString: function(){
                    return 'http://localhost:3000/';
                }
            }
        })
        
        afterEach(function(){
            Selector.ajax_load.restore();
            Selector.add_to_body.restore();
        })
        
        it('the correct number of pages should be loaded and counted', function(){
            Selector.load_pages(Selector.address);
            assert.equal(Selector.loaded.pages, 2);
        })
        
        it('the correct page cache was created', function(){
            Selector.load_pages(Selector.address);
            assert.notEqual($('#home_cache')[0], null, 'the name didn"t set properly, which means one of the path variables are wrong');
            reset_body();
        })
    });
    
    describe('#load_css()', function() {
        beforeEach(function(){
            Selector.loaded.css = 0;
        })
        
        afterEach(function(){
            Selector.loaded.css = 0;
            Selector.set_mode('desktop');
            reset_head();
        })
        
        function test_css_load(assert_callback, done){
            Selector.load_css();
            
            // wait for the css to load
            setTimeout(function(){
                assert_callback();
                done();
            }, 50)
        }
        
        it('the correct amount of desktop css files were loaded and counted', function(done){
            test_css_load(function(){
                assert.equal(Selector.loaded.css, Selector.scripts.desktop.css.length);
            }, done)
        })
        
        it('the correct amount of desktop css files are in the head', function(done){
            test_css_load(function(){
                assert.equal(Selector.scripts.desktop.css.length, $(document.head).children("link:not(link[href$='mocha.css'])").length);
            }, done)
        })
        
        it('the correct amount of mobile css files were loaded and counted', function(done){
            Selector.set_mode('mobile');
            
            test_css_load(function(){
                assert.equal(Selector.loaded.css, Selector.scripts.mobile.css.length);
            }, done)
        })
        
        it('the correct amount of mobile css files are in the head', function(done){
            Selector.set_mode('mobile');
            
            test_css_load(function(){
                assert.equal(Selector.scripts.mobile.css.length, $(document.head).children("link:not(link[href$='mocha.css'])").length);
            }, done)
        })
    });
    
    describe('#load_js()', function() {
        beforeEach(function(){
            // No ajax just call the data
            this.JS_TEST_VAL = 'test';
            
            // To add custom data to each simulated AJAX call
            Selector.test_value = 0;
            
            sinon.stub(Selector , 'ajax_load', function (mode, page, callback) {
                callback(this.JS_TEST_VAL);
                return true;
            });
        })
        
        afterEach(function(){
            Selector.loaded.js = 0;
            Selector.set_mode('desktop');
            Selector.ajax_load.restore();
        })
        
        function test_js_load(assert_callback, done){
            Selector.load_js();
            
            // wait for the css to load
            setTimeout(function(){
                assert_callback();
                done();
            }, 50)
        }
        
        it('the correct amount of desktop js files were loaded and counted', function(done){
            test_js_load(function(){
                assert.equal(Selector.loaded.js, Selector.scripts.desktop.js.length + Selector.scripts.common.js.length);
            }, done)
        })
        
        it('the correct amount of desktop js files were evaled', function(done){
             test_js_load(function(){
                for (var i = 0; i < Selector.scripts.desktop.js.length; i++)
                    assert.equal(Selector.scripts.js_loaded[i], this.JS_TEST_VAL);
            }, done)
        })
        
        it('the correct amount of mobile js files were loaded and counted', function(done){
            Selector.set_mode('mobile');
            
            test_js_load(function(){
                assert.equal(Selector.loaded.js, Selector.scripts.mobile.js.length + Selector.scripts.common.js.length);
            }, done)
        })
        
        it('the correct amount of mobile js files were evaled', function(done){
            Selector.set_mode('mobile');
            
            test_js_load(function(){
                for (var i = 0; i < Selector.scripts.mobile.js.length; i++)
                    assert.equal(Selector.scripts.js_loaded[i], this.JS_TEST_VAL);
            }, done)
        })
        
        function test_script_execution_order(done){
            var MAX_DELAY = 10;// In ms
            var COMMON_LENGTH = Selector.scripts.common.js.length;
            var MODE_LENGTH = Selector.scripts[Selector.get_mode()].js.length;
            
            // Random timeout to simulate asynchronous file loading page is sent so comparisons can be made later
            Selector.ajax_load.restore();
            sinon.stub(Selector , 'ajax_load', function (mode, page, callback) {
                setTimeout(function(){
                    callback(page);
                }, Math.floor(Math.random() * MAX_DELAY))
            });
            
            setTimeout(function() {
                test_js_load(function(){
                    // The file names are the test data inserted into loaded the order should be the same as in scripts
                    for (var s = 0; s < COMMON_LENGTH; s += 1)
                        assert.equal(Selector.scripts.js_loaded[s].split('/').pop(), Selector.scripts.common.js[s].split('/').pop());
                        
                    // notice var was not reset
                    for (;s < MODE_LENGTH + COMMON_LENGTH; s += 1)
                        assert.equal(Selector.scripts.js_loaded[s].split('/').pop(), Selector.scripts[Selector.get_mode()].js[s - COMMON_LENGTH].split('/').pop());
                }, done)
            }, MAX_DELAY * (MODE_LENGTH + COMMON_LENGTH));//enough time for all random results to finish
        }
        
        var test_name = ' the order of execution for the files is correct';
        it('(RANDOM TEST 1)' + test_name, function(done){
            test_script_execution_order(done);
        })
        it('(RANDOM TEST 2)' + test_name, function(done){
            test_script_execution_order(done);
        })
        it('(RANDOM TEST 3)' + test_name, function(done){
            test_script_execution_order(done);
        })
        it('(RANDOM TEST 4)' + test_name, function(done){
            test_script_execution_order(done);
        })
        it('(RANDOM TEST 5)' + test_name, function(done){
            test_script_execution_order(done);
        })
    });
    
    describe('#is_system_loaded()', function() {
        afterEach(function(){
            Selector.set_mode('desktop');
            Selector.loaded.css = 0;
            Selector.loaded.js = 0;
            Selector.loaded.pages = 0;
        })
        
        
        it('is not loaded when all desktop css is present', function(){
            Selector.loaded.css = Selector.scripts.desktop.css.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('is not loaded when all mobile css is present', function(){
            Selector.set_mode('mobile');
            
            Selector.loaded.css = Selector.scripts.mobile.css.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('is not loaded when all common js is present', function(){
            Selector.loaded.js = Selector.scripts.common.js.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('is not loaded when all desktop js is present', function(){
            Selector.loaded.js = Selector.scripts.desktop.js.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('is not loaded when all mobile js is present', function(){
            Selector.set_mode('mobile');
            
            Selector.loaded.js = Selector.scripts.mobile.js.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('is not loaded when all pages are present', function(){
            Selector.loaded.pages = Selector.PAGES_TO_LOAD;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        function test_js_css_load(mode){
            Selector.loaded.js = Selector.scripts[mode].js.length + Selector.scripts.common.js.length;
            Selector.loaded.css = Selector.scripts[mode].css.length;
            assert.equal(Selector.is_system_loaded(), false);
        }
        it('is not loaded when all desktop css and js are present', function(){
            test_js_css_load(Selector.get_mode());
        })
        
        it('is not loaded when all mobile css and js are present', function(){
            Selector.set_mode('mobile');
            test_js_css_load(Selector.get_mode());
        })
        
        function test_all_load(mode){
            Selector.loaded.js = Selector.scripts[mode].js.length + Selector.scripts.common.js.length;
            Selector.loaded.css = Selector.scripts[mode].css.length;
            Selector.loaded.pages = Selector.PAGES_TO_LOAD;
            assert.equal(Selector.is_system_loaded(), true);
        }
        it('is loaded when all desktop css, js and pages are present', function(){
            test_all_load(Selector.get_mode());
        })
        
        it('is loaded when all mobile css, js and pages are present', function(){
            Selector.set_mode('mobile');
            test_all_load(Selector.get_mode());
        })
    });
    
    // this is mainly to test if the right interface is selected
    // TODO more mobile browsers
    describe('#init()', function() {
        beforeEach(function(){
            Selector.mode = '';
            sinon.stub(Selector , 'render_mobile', function (){
                Selector.mode = 'mobile';
            });
            sinon.stub(Selector , 'render_desktop', function (){
                Selector.mode = 'desktop';
            });
            
            this.MOBILE_USER_STRING = "The Wowser, the best Browser! v.2.2 Mobile<'-'< <'-'< ^'-'^ >'-'> >'-'> ^'V'^";
            this.DESKTOP_USER_STRING = "The Wowser, the best Browser! v.2.2 Desktop<'-'< <'-'< ^'-'^ >'-'> >'-'> ^'V'^";
        })
        
        afterEach(function(){
            Selector.render_mobile.restore();
            Selector.render_desktop.restore();
        })
        
        it('the system loads mobile when the screen width is below 720px', function(){
            Selector.init(false, 720,'');
            assert(Selector.get_mode(), 'mobile');
        })
        
        it('the system loads mobile when mobile is in the user agent string', function(){
            Selector.init(false, '', this.MOBILE_USER_STRING);
            assert(Selector.get_mode(), 'mobile');
        })
        
        it('the system loads desktop when the screen is wider than 720px and has no "mobile" in the user agent string', function(){
            Selector.init(false, 721, this.DESKTOP_USER_STRING);
            assert(Selector.get_mode(), 'desktop');
        })
    });
})
