var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

Portfolio.runAngular = function(){
    angular.bootstrap(document);
}

// Set up the routes in HTML 5 mode (so hash tags are only used if necessary) 
angular.module('Portfolio2', []).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        // KEYWORD must be equal to keyword in server routes
        var KEYWORD = '_angular';
        (function routeIt(location, options){
            $routeProvider.when(location, options);
            return routeIt;
        })
        ('/home',       {templateUrl: 'home'+KEYWORD,       controller: ''})
        ('/skills',     {templateUrl: 'skills'+KEYWORD,     controller: ''})
        ('/experience', {templateUrl: 'experience'+KEYWORD, controller: ''})
        ('/demos',      {templateUrl: 'demos'+KEYWORD,      controller: ''})
        ('/blog',       {templateUrl: 'blog'+KEYWORD,       controller: ''});

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);