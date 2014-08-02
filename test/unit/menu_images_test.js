var assert = chai.assert;

describe('menuImages', function(){
    var test;
    beforeEach(function(){
        test = {};

        test.menuImages = Portfolio.menuImages;
    });

    it('should start with an empty set of images', function(){
        assert.isTrue(_.isEmpty(test.menuImages.images.length));
    });

    describe('#add()', function(){
        beforeEach(function(){
            test.menuImages.images = [];
        });

        it('should add an undefined/null item to the list', function(){
            _.forEach([null, undefined], function(value){
                test.menuImages.add(value)
                assert.equal(test.menuImages.images.length, 1);
                assert.equal(test.menuImages.images[0], value);

                test.menuImages.images.length = 0;
            });
        });

        it('should return the item it added to the list', function(){
            assert.equal(test.menuImages.add('an item'), 'an item');
        });

        it('should accumulate items when they are added consecutively', function(){
            _.forEach(_.range(10), function(index){
                test.menuImages.add(index);
                assert.equal(test.menuImages.images.length, index + 1);
                assert.equal(_.last(test.menuImages.images), index);
            });
        });
    });

    describe('#setAllGreyExcept()', function(){
        function makeImage(page){
            return {
                setBackground: test.setBackground,
                page: page
            };
        }

        beforeEach(function(){
            test.setBackground = stub();
            test.menuImages.images = [];
        });

        it('should do nothing (and not error) when there are no images', function(){
            test.menuImages.setAllGreyExcept();
            assert.equal(test.menuImages.images.length, 0);
        });

        it('should call image setBackground with false when the image page is not the same as sent in', function(){
            test.menuImages.add(makeImage('home'));
            test.menuImages.setAllGreyExcept('demos');
            
            assert.isTrue(test.setBackground.calledOnce);
            assert.isTrue(test.setBackground.calledWith(false));
        });

        it('should call image setBackground with true when the image page is the same as sent in', function(){
            test.menuImages.add(makeImage('demos'));
            test.menuImages.setAllGreyExcept('demos');
            
            assert.isTrue(test.setBackground.calledOnce);
            assert.isTrue(test.setBackground.calledWith(true));
        });

        it('should call image setBackground with true for one image and the rest false when only one image matches', function(){
            test.menuImages.images = [makeImage('home'), makeImage('skills'), makeImage('experience')];
            test.menuImages.setAllGreyExcept('skills');
            
            assert.isTrue(test.setBackground.calledThrice);
            assert.equal(test.setBackground.args[0][0], false);
            assert.equal(test.setBackground.args[1][0], true);
            assert.equal(test.setBackground.args[2][0], false);
        });
    });
});