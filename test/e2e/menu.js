describe('Menu', function(){
    it('should start with home item coloured', function(){
        // Need to make sure the page loads
        browser().navigateTo('/');
        sleep(0.5);

        // sanity check
        expect(browser().location().url()).toBe('/home');

        ['home', 'skills', 'experience', 'demos', 'blog'].forEach(function(page){
            var extra = (page !== 'home') ? '_grey' : '',
                url = 'url(http://localhost:9877/images/menu_icons/'+page+'_page'+extra+'.png)'
            expect(element('#'+page + '_button > a > div').css('background-image')).toBe(url);
        });
    });
});