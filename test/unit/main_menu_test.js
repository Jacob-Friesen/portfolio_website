var assert = chai.assert;

describe('Main Menu Controller', function(){

    var test;
    beforeEach(function(){ 
        module('Portfolio2');

        inject(function($rootScope, $controller){
            test = {};

            test.scope = {};
            test.controller = $controller('MainMenuCtrl', {
                $scope: test.scope
            });
        });
    });

    it('should set a pages array with at least one string to the scope', function(){
        assert.isTrue(test.scope.pages.length > 0);
        _.forEach(test.scope.pages, function(page){
            assert.isString(page);
        });
    });
});