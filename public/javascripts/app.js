var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

Portfolio.runAngular = function(){
    angular.bootstrap(document);
}

// Set up the routes in HTML 5 mode (so hash tags are only used if necessary) 
Portfolio.app = angular.module('Portfolio2', []);
Portfolio.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $rootScope) {
    $locationProvider.html5Mode(true);

    // KEYWORD must be equal to keyword in server routes
    var KEYWORD = '_angular';
    (function routeIt(location, options){
        $routeProvider.when(location, options);
        return routeIt;
    })
    ('/home',       {templateUrl: 'home'+KEYWORD,       controller: Portfolio.PageBase})
    ('/skills',     {templateUrl: 'skills'+KEYWORD,     controller: Portfolio.PageBase})
    ('/experience', {templateUrl: 'experience'+KEYWORD, controller: Portfolio.PageBase})
    ('/demos',      {templateUrl: 'demos'+KEYWORD,      controller: Portfolio.PageBase})
    ('/blog',       {templateUrl: 'blog'+KEYWORD,       controller: Portfolio.PageBase});

    $routeProvider.otherwise({redirectTo: '/home'});
}]);

Portfolio.app.run(function($rootScope) {
    $rootScope.alert = function(msg){
        alert(msg);
    }

    $rootScope.log = function(msg){
        console.log(msg);
    }
});