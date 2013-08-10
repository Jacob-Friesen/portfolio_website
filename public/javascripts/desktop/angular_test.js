var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

Portfolio.runAngular = function(){
    angular.bootstrap(document);
}

// Controllers

Portfolio.Hello = ['$scope', function($scope) {
    $scope.name = 'World';
}];

var Portfolio2 = angular.module('Portfolio2', []);
 
// register a new service
Portfolio2.value('appName', 'Portfolio2');