var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

Portfolio.runAngular = function(){
    angular.bootstrap(document);
}

// Set up the routes in HTML 5 mode (so hash tags are only used if necessary) 
Portfolio.app = angular.module('Portfolio2', []);
Portfolio.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    // KEYWORD must be equal to keyword in server routes
    var KEYWORD = '_angular?type=' + ((Portfolio.selector !== undefined) ? Portfolio.selector.get_mode() : '');
    (function routeIt(location, options){
        $routeProvider.when(location, options);
        return routeIt;
    })
    ('/home',       {templateUrl: 'home' + KEYWORD,       controller: Portfolio.Home})
    ('/skills',     {templateUrl: 'skills' + KEYWORD,     controller: Portfolio.Skills})
    ('/experience', {templateUrl: 'experience' + KEYWORD, controller: Portfolio.Experience})
    ('/demos',      {templateUrl: 'demos' + KEYWORD,      controller: Portfolio.Demos})
    ('/blog',       {templateUrl: 'blog' + KEYWORD,       controller: Portfolio.Blog});

    $routeProvider.otherwise({redirectTo: '/home'});
}]);

Portfolio.app.run(['$rootScope', '$window', function($rootScope, $window) {
    $rootScope.getCurrentPage = function(){
        return $window.location.href.split('/').pop();
    }
}]);