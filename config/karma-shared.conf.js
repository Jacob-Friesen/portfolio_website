module.exports = function(config){
    config.set({
        basePath: '../',

        // Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS, IE
        browsers: ['PhantomJS'],

        // 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        autoWatch: true,
        singleRun: true,

        colors: true,
        logLevel: config.LOG_INFO
    })
}