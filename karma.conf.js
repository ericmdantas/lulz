// Karma configuration
// Generated on Fri Sep 26 2014 20:44:54 GMT-0300 (Hora oficial do Brasil)

module.exports = function(config)
{
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'client/dev',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files:
    [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/**/*.min.js',

      'js/application/lulz.js',
      'js/application/user/user.js',
      'js/application/post/post.js',
      'js/application/trophies/trophies.js',
      'js/application/**/*.js',

      '../../tests/frontend/mocks/angular-mocks.js',
      '../../tests/frontend/mocks/socket-io-mock.js',

      '../../tests/frontend/helper/helper.js',

      '../../tests/frontend/**/*_test.js',

      'partials/includes/*.html'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors:
    {
        'js/application/**/*.js' : ['coverage'],
        'partials/includes/*.html': ['ng-html2js']
    },

    coverageReporter:
    {
      type : 'html',
      dir : '../../unit_coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dot', 'coverage'],

    ngHtml2JsPreprocessor:
    {
      moduleName: 'my.includes'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'IE', /*'Opera', */'Safari', 'Firefox', 'ChromeCanary'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
