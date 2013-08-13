var shared = require('./karma-shared.conf');

// Integration test configuration
module.exports = function(config){
    shared(config);

    config.set({
        // IGNORE THE "Please use `frameworks = ["ng-scenario"];` instead."
        // The tests on start up will fail, but the subsequent tests will succeed when on version 1.1.5
        files: [
            'test/lib/angular/angular-scenario.js',// Must be 1.0.7 for now, see above
            ANGULAR_SCENARIO_ADAPTER,

            'test/e2e/*.js'
        ],

        proxies: {
          '/': 'http://localhost:3000/'
        },
        urlRoot: '/_karma_/'
    });
}