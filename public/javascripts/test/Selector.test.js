var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

// globals that Mocha won't complain about
mocha.setup({globals: ['toString']});

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
        
        it('should load a valid file', function(done) {
            Selector.ajax_load('/stylesheets/mocha.css', null, function(){
                done();
            });
        })
        
        it('should load the contents of a valid file into an element and return the contents in the callback', function(done){
            var to_add_to = $('<div id="to_add_to"/>');
            $(document.body).append(to_add_to);
            
            Selector.ajax_load('/stylesheets/mocha.css', to_add_to, function(response){
                assert.equal(to_add_to.innerHTML, response);
                
                $("#to_add_to").remove();
                done();
            });
        })
    });
    
    
    describe('#load_pages()', function() {
        beforeEach(function(){
            Selector.loaded.pages = 0;
            
            // no ajax just call the data
            sinon.stub(Selector , 'ajax_load', function (page, element, callback) {
                callback('test');
                return true;
            });
            
            // So the correct locations are retrieved
            Selector.INDEX_PAGE = "/" + Selector.INDEX_PAGE;
            Selector.address = {
                pathname: undefined,
                toString: function(){
                    'http://localhost:3000/'
                }
            }
        })
        
        afterEach(function(){
            Selector.ajax_load.restore();
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
        it('the correct amount of css files were loaded and counted', function(done){
            Selector.load_css();
            
            // wait for the css to load
            setTimeout(function(){
                assert.equal(Selector.loaded.css, Selector.scripts.css.length);
                reset_head();
                done();
            }, 50)
        })
        
        it('the correct amount of css files are in the head', function(done){
            Selector.load_css();
            
            // wait for the css to load
            setTimeout(function(){
                assert.equal(Selector.scripts.css.length, $(document.head).children("link:not(link[href$='mocha.css'])").length);
                reset_head();
                done();
            }, 50)
        })
    });
    
    describe('#load_js()', function() {
        beforeEach(function(){
            // no ajax just call the data
            this.JS_TEST_VAL = 'test';
            
            sinon.stub(Selector , 'ajax_load', function (page, element, callback) {
                callback(this.JS_TEST_VAL);
                return true;
            });
        })
        
        afterEach(function(){
            Selector.ajax_load.restore();
        })
        
        it('the correct amount of js files were loaded and counted', function(done){
            Selector.load_js();
            
            // wait for the js to load
            setTimeout(function(){
                assert.equal(Selector.loaded.js, Selector.scripts.js.length);
                done();
            }, 50)
        })
        
        it('the correct amount of js files were evaled', function(){
            Selector.load_js();
            
            setTimeout(function(){
                for (var i = 0; i < Selector.scripts.js.length; i++)
                    assert.equal(Selector.scripts.js_loaded[i], this.JS_TEST_VAL);
            })
        })
    });
    
    describe('#is_system_loaded()', function() {
        afterEach(function(){
            Selector.loaded.css = 0;
            Selector.loaded.js = 0;
            Selector.loaded.pages = 0;
        })
        
        it('the system is not loaded when all css is present', function(){
            Selector.loaded.css = Selector.scripts.css.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('the system is not loaded when all js is present', function(){
            Selector.loaded.js = Selector.scripts.js.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('the system is not loaded when all pages are present', function(){
            Selector.loaded.pages = Selector.PAGES_TO_LOAD;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('the system is not loaded when all css and js are present', function(){
            Selector.loaded.js = Selector.scripts.js.length;
            Selector.loaded.css = Selector.scripts.css.length;
            assert.equal(Selector.is_system_loaded(), false);
        })
        
        it('the system is loaded when all css, js and pages are present', function(){
            Selector.loaded.js = Selector.scripts.js.length;
            Selector.loaded.css = Selector.scripts.css.length;
            Selector.loaded.pages = Selector.PAGES_TO_LOAD;
            assert.equal(Selector.is_system_loaded(), true);
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
        })
        
        afterEach(function(){
            Selector.render_mobile.restore();
            Selector.render_desktop.restore();
        })
        
        it('the system loads mobile when the screen width is below 720px', function(){
            Selector.init(false, 720,'');
            assert(Selector.mode, 'mobile');
        })
        
        it('the system loads mobile when mobile is in the user agent string', function(){
            Selector.init(false, '',"The Wowser, the best Browser! v.2.2 mobile<'-'< <'-'< ^'-'^ >'-'> >'-'> ^'V'^");
            assert(Selector.mode, 'mobile');
        })
        
        it('the system loads desktop when the screen is wider than 720px and has no "mobile" in the user agent string', function(){
            Selector.init(false, 721, "The Wowser, the best Browser! v.2.2 destkop<'-'< <'-'< ^'-'^ >'-'> >'-'> ^'V'^");
            assert(Selector.mode, 'desktop');
        })
    });
})
