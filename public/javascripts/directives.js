// Handles all operations over registered menuImage directives.
Portfolio.MenuImages = function(){
    var self = this;
    this.images = [];

    this.add = function(menuImage){
        self.images.push(menuImage);
        return menuImage;
    }

    this.setAllGreyExcept = function(page){
        _.forEach(self.images, function(image, index){
            image.setBackground(image.page === page);
        });
    }

    return this;
};
Portfolio.menuImages = new Portfolio.MenuImages();

Portfolio.app.directive('menuImage', function($interpolate, $compile){
    var template = "<a class='menuLink' href='{{page.toLowerCase()}}'>" + 
                        "<div class='{{page.toLowerCase()}}-button'>" +
                            "<h2>{{page}}</h2>" +
                        "</div>" +
                    "</a>";

    var oldSetBackground = function(page, backgrounder, toggle){
        backgrounder[0].className = '';
        if (!toggle)
            backgrounder[0].className = page + '-button';
        else
            backgrounder[0].className = page + '-button-selected';

        toggle = !toggle;
    };
    var otherSet = null;
    return {
        restrict : 'E',
        replace: true,

        // Make sure the template is interpolated before being added to the dom so the src gets a correct address. Also adds listeners and a
        // wrapped set background method so background can be set externally.
        link: function(scope, element, attrs){
            var newElement = angular.element($interpolate(template)(scope));
            element.replaceWith(newElement);

            var page = scope.page.toLowerCase(),
                backgrounder = newElement.find('div'),
                toggle = true;
                
            Portfolio.menuImages.add({
                setBackground: function(override){
                    oldSetBackground(page, backgrounder, (override !== undefined) ? override : toggle);
                },
                page: page
            });

            newElement.bind('click', function(e){
                oldSetBackground(page, backgrounder, toggle);
            });
        }
    };
});