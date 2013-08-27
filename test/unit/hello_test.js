var assert = chai.assert;

// Just to ensuring testing works, will be removed as app is further developed
describe('HelloController', function(){
    var test;
    beforeEach(inject(function($rootScope, $controller){
        test = {};

        test.scope = {};
        test.controller = $controller('Portfolio.Hello', {
            $scope: test.scope
        })
    }));

    it('should run a basic test', function(){
        assert.equal(1, 1);
    });

    it('should add a name with "World" to scope', function(){
        assert.equal(test.scope.name, 'World');
    });

});