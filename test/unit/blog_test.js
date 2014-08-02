var assert = chai.assert,
    stub = sinon.stub;

describe('BlogController', function(){
    var test;
    beforeEach(inject(function($rootScope, $controller){
        test = {};

        test.getJSON = stub(jQuery, 'getJSON');

        test.scope = {};
        test.controller = $controller('Portfolio.Blog', {
            pageLoad: {
                load: function(){}
            }
        });
    }));

    it('should get json at the BLOG LOCATION', function(){
        assert.isTrue(test.getJSON.calledOnce);
        assert.isTrue(test.getJSON.calledWith(test.controller.BLOG_LOCATION, {}));
    });

    // Rest of tests will need to be e2es
});