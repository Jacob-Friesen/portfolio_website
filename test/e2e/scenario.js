describe('index page', function(){
    beforeEach(function(){
        browser().navigateTo('/');

        // Waiting for the JS to generate, so angular is loaded
        sleep(0.5);
    });

    it('should have a working redirect', function(){
        expect(browser().location().url()).toBe('');
    });

    it('has hello world greeting', function() {
        expect(element('#helloWorld').text()).toBe('Hello World!');
    });
});