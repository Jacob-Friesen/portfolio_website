var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

// Just for testing, will be removed once the app is more refined
Portfolio.Hello = ['$scope', function($scope) {
    $scope.name = 'World';
}];

Portfolio.MainMenu = ['$scope', function($scope) {
    $scope.pages = Portfolio.constants.pages;
}];

Portfolio.Home = ['pageLoad', function(pageLoad) {
    pageLoad.load();

    // Usually DOM manipulation shouldn't be done in a controller, but I will make an exception for now in this controller
    $(".mainImage").each( function (i, element) {
        $(element).attr("src", $("#mainImg").attr("src").replace('_s',''));
    });
}];

Portfolio.Skills = ['pageLoad', function(pageLoad) {
    pageLoad.load();
}];

Portfolio.Experience = ['pageLoad', '$scope', function(pageLoad, scope) {
    pageLoad.load();

    scope.toggleJobOpen = function(){
        console.log('toggling');
    }
}];

Portfolio.Demos = ['pageLoad', function(pageLoad) {
    pageLoad.load();
}];

Portfolio.Blog = ['pageLoad', function(pageLoad) {
    pageLoad.load();
}];