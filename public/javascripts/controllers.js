var Portfolio = (typeof Portfolio === 'undefined') ? {} : Portfolio;

angular.module('Portfolio2').controller('MainMenuCtrl', ['$scope', function($scope) {
    $scope.pages = Portfolio.constants.pages;
}])

.controller('HomeCtrl', ['pageLoad', function(pageLoad) {
    pageLoad.load();

    // Usually DOM manipulation shouldn't be done in a controller, but I will make an exception for now in this controller
    $(".mainImage").each( function (i, element) {
        $(element).attr("src", $("#mainImg").attr("src").replace('_s',''));
    });
}])

.controller('SkillsCtrl', ['pageLoad', function(pageLoad) {
    pageLoad.load();
}])

.controller('ExperienceCtrl', ['pageLoad', function(pageLoad) {
    pageLoad.load();
}])

.controller('DemosCtrl', ['pageLoad', function(pageLoad) {
    pageLoad.load();
}])

.controller('BlogCtrl', ['pageLoad', function(pageLoad) {
    pageLoad.load();
    var self = this;
        self.BLOG_LOCATION = 'http://obscurejavascript.tumblr.com/api/read/json?callback=?';

    // Load the post and populate the blog posting and titles in the current dom
    this.loadPost = (function load(){
        // Must only use $.getJSON for this request, don't quite know why.
        $.getJSON(self.BLOG_LOCATION, {}, function(response) {
            // Update regular dom elements and the cached ones
            $('.blogTitle').each(function(){
                this.innerHTML = response.posts[0]['regular-title'];
            });

            $('.blogPosting').each(function(){
                this.innerHTML = response.posts[0]['regular-body'];
            });
            
            self.prettifyCode();
        });

        return load;
    })();

    this.prettifyCode = function(){
        var a = false;
            
        // Give all code the code hightlighting css classes
        $('code').each(function() {
            if (!$(this).hasClass('prettyprint')) {
                $(this).addClass('prettyprint');
                a = true;
            }
        });

        // Execute the pretty print JS to do any modifications
        if (a) prettyPrint();
    }
}]);