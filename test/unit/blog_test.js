var assert = chai.assert,
    stub = sinon.stub;

describe('Blog Controller', function(){
    var test;
    beforeEach(function(){
        module('Portfolio2');

        inject(function($rootScope, $controller){
            test = {};

            test.getJSON = stub(jQuery, 'getJSON');

            test.scope = {};
            test.controller = $controller('BlogCtrl', {
                pageLoad: {
                    load: function(){}
                }
            });
        });
    });

    it('should get json at the BLOG LOCATION', function(){
        assert.isTrue(test.getJSON.calledOnce);
        assert.isTrue(test.getJSON.calledWith(test.controller.BLOG_LOCATION, {}));
    });

    // Rest of tests will need to be e2es
});