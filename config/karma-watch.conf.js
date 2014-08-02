var shared = require('./karma.conf');

// Unit watch configuration
module.exports = function(config){
    shared(config);

    config.set({
        singleRun: false
    });
};
