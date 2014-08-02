var shared = require('./karma-shared.conf');

// Integration test configuration
module.exports = function(config){
    shared(config);

    var HOST = 'http://localhost:3000/';
    config.set({
        // IGNORE THE "Please use `frameworks = ["ng-scenario"];` instead."
        // The tests on start up will fail, but the subsequent tests will succeed when on version 1.1.5
        files: [
            'test/lib/angular/angular-scenario.js',// Must be 1.0.7 for now, see above
            ANGULAR_SCENARIO_ADAPTER,

            'test/lib/lodash/lodash.js',

            'test/e2e/*.js'
        ],

        proxies: {
          '/': HOST,
          '/_karma_/home': HOST+'home',
          '/_karma_/skills': HOST+'skills',
          '/_karma_/experience': HOST+'experience',
          '/_karma_/demos': HOST+'demos',
          '/_karma_/blog': HOST+'blog',

          '/_karma_/javascripts': HOST+'javascripts',
        },
        urlRoot: '/_karma_/'
    });
}