describe('Menu', function(){
    function checkPageColoured(checkPage){
        ['home', 'skills', 'experience', 'demos', 'blog'].forEach(function(page){
            var extra = (page !== checkPage) ? '_grey' : '',
                url = 'url(http://localhost:9876/images/menu_icons/'+page+'_page'+extra+'.png)'
            expect(element('#' + page + '_button > a > div').css('background-image')).toBe(url);
        });
    }

    it('should start with home item coloured (when on default page)', function(){
        // Need to make sure the page loads
        browser().navigateTo('/');
        sleep(0.5);

        // sanity check
        expect(browser().location().url()).toBe('/home');

        checkPageColoured('home');
    });

    it('should make the corresponding image to the colored position on page load', function(){
        ['home', 'skills', 'experience', 'demos', 'blog'].forEach(function(page){
            browser().navigateTo('/' + page);
            sleep(0.5);

            expect(browser().location().url()).toBe('/' + page);
            checkPageColoured(page);
        });
    });

    it('should make the corresponding image to the colored position on going to a page', function(){
        browser().navigateTo('/');
        sleep(0.5);

        ['home', 'skills', 'experience', 'demos', 'blog'].forEach(function(page){
            element('#' + page + '_button > a').click();
            sleep(0.2);

            expect(browser().location().url()).toBe('/' + page);
            checkPageColoured(page);
        });
    });
});