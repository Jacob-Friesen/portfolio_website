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
            'test/lib/sinon/sinon.js',
            'test/lib/lodash/lodash.js',

            // Custom files
            'public/constants.js',
            'public/javascripts/app.js',
            'public/javascripts/directives.js',
            'public/javascripts/services.js',
            'public/javascripts/controllers.js',

            'test/unit/*test.js'
        ],

        port: 9876,

        captureTimeout: 60000
    });
};
