describe('routes', function(){
    function blogTest(){
        expect(browser().location().url()).toBe('/blog');
        expect(element('#bTitleWrapper').text()).toBe('Blog');
    }

    function refreshAndCheck(page){
        refresh(page);
        checkPage(page);
    }

    function checkPage(page){
        expect(browser().location().url()).toBe(page);

        var title = page.substring(1);
            title = title.charAt(0).toUpperCase() + title.slice(1);

        expect(element('#hTitleWrapper').text()).toBe(title);
    }

    function refresh(to){
        browser().navigateTo(to);

        // Waiting for the JS to generate, so angular is loaded
        sleep(0.5);
    }

    beforeEach(function(){
        refresh('/');
    });

    it('should route to home when the name is empty, index or home', function(){
        expect(browser().location().url()).toBe('/home');

        ['/index', '/index.html', '/index.jade', '/home'].forEach(function(location){
            refresh(location);
            checkPage('/home');
        });
    });

    it('should route to skills when skills is in the url', function(){
        refreshAndCheck('/skills');
    });

    it('should route to experience when experience is in the url', function(){
        refreshAndCheck('/experience');
    });

    it('should route to demos when demos is in the url', function(){
        refreshAndCheck('/demos');
    });

    it('should route to blog when blog is in the url', function(){
        refresh('/blog');
        blogTest();
    });

    it('should change get the correct pages when clicking through each part of the menu', function(){
        ['home', 'skills', 'experience', 'demos', 'blog'].forEach(function(page){
            element('#' + page + '_link').click();
            sleep(0.2);

            if (page !== 'blog')
                checkPage('/' + page);
            else
                blogTest();
        });
    });
});