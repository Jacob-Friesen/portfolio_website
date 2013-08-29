describe('Menu', function(){
    it('should set the home image to the high res version after load', function(){
        browser().navigateTo('/');
        sleep(0.5);

        // sanity check
        expect(browser().location().url()).toBe('/home');

        expect(element('#mainImg').attr('src')).toBe('images/Jacob.jpg');
    });
});