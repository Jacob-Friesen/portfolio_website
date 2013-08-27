var assert = chai.assert,
    stub = sinon.stub;

describe('PageBaseController', function(){
    function testPageEnter(page){
        test.setAllGreyExcept = stub(Portfolio.menuImages, "setAllGreyExcept");

        inject(function($controller){
            test.controller = $controller('Portfolio.PageBase', {
                $location: {
                    path: function(){ return page }
                }
            });
        });

        assert.isTrue(test.setAllGreyExcept.calledOnce)
        assert.isTrue(test.setAllGreyExcept.calledWith(page.substring(1)));

        test.setAllGreyExcept.restore();
    }

    var test;
    beforeEach(function(){
        test = {};
    });

    it('should call menuImages.setAllGreyExcept with "" when "" is the path', function(){
        testPageEnter('');
    });

    it('should call menuImages.setAllGreyExcept with "" when / is the path', function(){
        testPageEnter('/');
    });

    it('should call menuImages.setAllGreyExcept with demos when /home is the path', function(){
        testPageEnter('demos');
    });

    it('should call menuImages.setAllGreyExcept with home when /home is the path', function(){
        testPageEnter('home');
    });

});