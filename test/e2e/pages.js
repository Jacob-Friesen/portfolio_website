describe('Pages', function(){
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
        function checkOpen(checking){
            for (var i = 0; i <= 2; i += 1) {
                var val = (i === checking) ? '-' : '+';
                expect(element('.collapseText:eq('+i+')').html()).toBe(val);

                var val = (i === checking) ? 'block' : 'none';
                expect(element('.jobText:eq('+i+')').css("display")).toBe(val);
            }
        }

        function clickAndExpect(click, expectValue){
            element('.collapseText:eq('+click+')').click();
            sleep(0.4);

            checkOpen(expectValue);
        }

        it('should start with the first job opened', function(){
            browser().navigateTo('/experience');
            sleep(0.5);

            expect(browser().location().url()).toBe('/experience');

            checkOpen(0);
        });

        it('should close that job when clicked on', function(){
            clickAndExpect(0, -1);
        });

        it('should open that job when clicked on again', function(){
            clickAndExpect(0, 0);
        });

        it('should open the second job when clicked on and close the first', function(){
            clickAndExpect(1, 1);
        });

        it('should close the second job when clicked on again', function(){
            clickAndExpect(1, -1);
        });

        it('should open the third job when clicked on', function(){
            clickAndExpect(2, 2);
        });
    });
});