var assert = chai.assert;

describe('MainMenuController', function(){
    var test;
    beforeEach(inject(function($rootScope, $controller){
        test = {};

        test.scope = {};
        test.controller = $controller('Portfolio.MainMenu', {
            $scope: test.scope
        });
    }));

    it('should set a pages array with at least one string to the scope', function(){
        assert.isTrue(test.scope.pages.length > 0);
        _.forEach(test.scope.pages, function(page){
            assert.isString(page);
        });
    });
});