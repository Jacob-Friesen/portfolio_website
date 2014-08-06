Portfolio.app.factory('pageLoad', ['$location', function($location) {
    this.load = function(){
        Portfolio.menuImages.setAllGreyExcept($location.path().substring(1));
    }

    return this;
}]);