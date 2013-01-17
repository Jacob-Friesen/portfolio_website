var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('Selector', function() {
    describe('#ajax_load()', function() {
        it('should not load when null is sent', function(done) {
            var loaded = false;
            Selector.ajax_load(null, null, function(){
                assert.equal(1, 2);// cause a failure
            });
            
            setTimeout(function (){
                done();
            }, 100)
        })
        
        it('should load a valid file', function(done) {
            Selector.ajax_load('/javascripts/Selector.js', null, function(){
                done();
            });
        })
        
        it('should load the contents of a valid file into an element and return the contents in the callback', function(done){
            var to_add_to = $('<div id="to_add_to"/>');
            $(document.body).append(to_add_to);
            
            Selector.ajax_load('/javascripts/Selector.js', to_add_to, function(response){
                assert.equal(to_add_to.innerHTML, response);
                
                $("#to_add_to").remove();
                done();
            });
        })
    })
})
