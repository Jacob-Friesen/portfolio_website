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

Portfolio.Experience = ['pageLoad', function(pageLoad) {
    pageLoad.load();
}];

Portfolio.Demos = ['pageLoad', function(pageLoad) {
    pageLoad.load();
}];

Portfolio.Blog = ['pageLoad', function(pageLoad) {
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
}];