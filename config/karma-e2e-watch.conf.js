var shared = require('./karma-e2e.conf');

// Integration test configuration
module.exports = function(config){
    shared(config);

    config.set({
        singleRun: false
    });
}