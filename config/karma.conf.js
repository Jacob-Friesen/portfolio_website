var shared = require('./karma-shared.conf');

// Unit test configuration
module.exports = function(config){
    shared(config);

    config.set({
        frameworks: ['mocha'],

        files: [
            'public/javascripts/angular.min.js',
            'test/lib/angular/angular-mocks.js',

            // Testing add ons
            'test/lib/chai/chai.js',

            // Custom files
            'public/javascripts/desktop/angular_test.js',

            'test/unit/*test.js'
        ],

        port: 9876,

        captureTimeout: 60000
    });
};
