var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

Portfolio.runAngular = function(){
    angular.bootstrap(document);
}

Portfolio.Hello = ['$scope', function($scope) {
    $scope.name = 'World';
}];

Portfolio.HelloModule = angular.module('Hello', []);