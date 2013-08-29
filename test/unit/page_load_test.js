var assert = chai.assert,
    stub = sinon.stub;

describe('pageLoadService', function(){
    function testPageEnter(page){
        module('Portfolio2', function($provide) {
            $provide.value('$location', {
                path: function(){
                    return page;
                } 
            });
        });

        inject(function($injector) {
            test.pageLoad = $injector.get('pageLoad');
        });
        test.pageLoad.load(page);

        assert.isTrue(test.setAllGreyExcept.calledOnce)
        assert.isTrue(test.setAllGreyExcept.calledWith(page.substring(1)));
    }

    var test;
    beforeEach(function(){
        test = {};
        test.setAllGreyExcept = stub(Portfolio.menuImages, "setAllGreyExcept");
    });

    afterEach(function(){
        test.setAllGreyExcept.restore();
    });

    it('should call menuImages.setAllGreyExcept with "" when "" is the path', function(){
        testPageEnter('');
    });

    it('should call menuImages.setAllGreyExcept with "" when / is the path', function(){
        testPageEnter('/');
    });

    it('should call menuImages.setAllGreyExcept with demos when /demos is the path', function(){
        testPageEnter('demos');
    });

    it('should call menuImages.setAllGreyExcept with home when /home is the path', function(){
        testPageEnter('home');
    });
});