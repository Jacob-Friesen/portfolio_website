var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

// Just for testing, will be removed once the app is more refined
Portfolio.Hello = ['$scope', function($scope) {
    $scope.name = 'World';
}];

Portfolio.MainMenu = ['$scope', function($scope) {
    $scope.pages = Portfolio.constants.pages;
}];

Portfolio.PageBase = ['$location', function($location) {
     Portfolio.menuImages.setAllGreyExcept($location.path().substring(1));
}];