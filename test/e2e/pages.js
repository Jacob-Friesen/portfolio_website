describe('Pages', function(){
    function checkOpen(iconTemplateId, hidableTemplateId, checking){
        for (var i = 0; i <= 2; i += 1) {
            var val = (i === checking) ? '-' : '+';
            expect(element('#' + iconTemplateId + i).html()).toBe(val);

            var val = (i === checking) ? 'block' : 'none';
            expect(element('#' + hidableTemplateId + i).css("display")).toBe(val);
        }
    }

    function clickAndExpect(iconTemplateId, hidableTemplateId, append, expectValue){
        element('#' + iconTemplateId + append).click();
        sleep(0.4);

        checkOpen(iconTemplateId, hidableTemplateId, expectValue);
    }

    describe('home', function(){
        it('should set the home image to the high res version after load', function(){
            browser().navigateTo('/');
            sleep(0.5);

            // sanity check
            expect(browser().location().url()).toBe('/home');

            expect(element('#mainImg').attr('src')).toBe('images/Jacob.jpg');
        });
    });

    describe('experience', function(){
        it('should start with the first job opened', function(){
            browser().navigateTo('/experience');
            sleep(0.5);

            expect(browser().location().url()).toBe('/experience');

            checkOpen('exp-icon', 'exp-hide', 0, 0);
        });

        it('should not close any jobs when a non closable job is clicked', function(){
            element('#exp-wrapper4').click();
            sleep(0.4);
            checkOpen('exp-icon', 'exp-hide', 0, 0);
        });

        it('should close that job when clicked on', function(){
            clickAndExpect('exp-icon', 'exp-hide', 0, -1);
        });

        it('should open that job when clicked on again', function(){
            clickAndExpect('exp-icon', 'exp-hide', 0, 0);
        });

        it('should open the second job when clicked on and close the first', function(){
            clickAndExpect('exp-icon', 'exp-hide', 1, 1);
        });

        it('should close the second job when clicked on again', function(){
            clickAndExpect('exp-icon', 'exp-hide', 1, -1);
        });

        it('should open the third job when clicked on', function(){
            clickAndExpect('exp-icon', 'exp-hide', 2, 2);
        });
    });

    describe('blog', function(){
        it('should load a blog post', function(){
            browser().navigateTo('/blog');
            sleep(1.5);

            expect(element('.blogTitle').html()).not().toBe("Loading...");
            expect(element('.blogPosting').html()).not().toBe("");
        });

        it('should color the blog post', function(){
            expect(element('.prettyprinted').html()).not().toBe("");
        });
    });

    describe('demos', function(){
        function testOn(index, lrgUrl){
            var demoImg = element('#demoImg'+index),
                parent = element('.demoPic:has(#demoImg'+index+')');

            expect(parent).not().toBe('');
            demoImg.click();
            sleep(0.3);
            expect(parent).not().toBe('');

            var popped = element('#demoImg'+index+'_clone');
            expect(popped.attr('src')).toBe(lrgUrl);
            popped.click();
            sleep(0.3);
            expect(popped).not().toBeDefined();
            expect(parent).not().toBe('');
        }

        it('should have clickable images', function(){
            browser().navigateTo('/demos');
            sleep(1.5);

            testOn(0, 'images/winnipegjs.png');
            testOn(1, 'images/unsafe_minifier.png');
            testOn(2, 'images/IdersIMS2.png');
        });

        // This is using the same directive as in experience so less tests are needed
        it('should start with the first demo opened', function(){
            browser().navigateTo('/demos');
            sleep(0.5);

            expect(browser().location().url()).toBe('/demos');

            checkOpen('demo-icon', 'demo-hide', 0, 0);
        });

        it('should close that demos when clicked on', function(){
            clickAndExpect('demo-icon', 'demo-hide', 0, -1);
        });

        it('should open that demos when clicked on again', function(){
            clickAndExpect('demo-icon', 'demo-hide', 0, 0);
        });

        it('should open the second demos when clicked on and close the first', function(){
            clickAndExpect('demo-icon', 'demo-hide', 1, 1);
        });
    });

    describe('skills', function(){
        it('should start with the first skill opened and the first subskill', function(){
            browser().navigateTo('/skills');
            sleep(0.5);

            expect(browser().location().url()).toBe('/skills');

            checkOpen('skills-icon', 'skills-hide', 0, 0);
            checkOpen('skills-icon0-', 'skills-hide0-', 0, 0);
        });

        it('should open a new sub skill when clicked on', function(){
            clickAndExpect('skills-icon0-', 'skills-hide0-', 1, 1);
        });

        it('should be able to close that close that subskill', function(){
            clickAndExpect('skills-icon0-', 'skills-hide0-', 1, -1);
        });

        it('should open a new skill section with the first subskill opened', function(){
            clickAndExpect('skills-icon', 'skills-hide', 1, 1);
            checkOpen('skills-icon1-', 'skills-hide1-', 0, 0);
        });

        it('should open a new sub skill when clicked on', function(){
            clickAndExpect('skills-icon1-', 'skills-hide1-', 1, 1);
        });

        it('should be able to close that close that subskill', function(){
            clickAndExpect('skills-icon1-', 'skills-hide1-', 1, -1);
        });

        it('should be able to close the current skill section', function(){
            clickAndExpect('skills-icon', 'skills-hide', 1, -1);
        });
    });
});