var assert = chai.assert;

describe('MenuImageDirective', function() {
    beforeEach(module('Portfolio2'));

    it('Should convert the element into an "a" tag with the specified page in the href and in child elements', function() {
        var element = null,
            page = 'A page',
            lowerPage = page.toLowerCase();
            html =  '<div>' +
                        '<menu-image></menu-image>' +
                    '</div>';

        function checkElement(element, findBy, attribute){
            var element = element.find(findBy);
            assert.equal(element.length, 1);
            assert.isTrue(element.attr(attribute).indexOf(lowerPage) > -1);

            return element;
        }

        inject(function($compile, $rootScope) {
            var scope = $rootScope;
                scope.page = page;

            element = angular.element(html);

            $compile(element)(scope);
            scope.$digest();
        });

        element = checkElement(element, 'a', 'href');
        element = checkElement(element, 'div', 'class');
        element = element.find('h2');
        assert.equal(element.length, 1);
        assert.isTrue(element.html().indexOf(page) > -1);
    });
});