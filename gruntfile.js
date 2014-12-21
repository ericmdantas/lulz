"use strict";

module.exports = function(grunt)
{
    var _devDir = 'client/dev/';
    var _tempDir = 'client/temp/';
    var _distDir = 'client/dist/';

    var _packageJSON = grunt.file.readJSON('package.json');

    var _loadGruntPlugins = function()
    {
        var _devDeps = _packageJSON.devDependencies;

        Object.keys(_devDeps)
              .filter(function(task)
              {
                  var _isGruntTask = /^grunt-/;
                  return _isGruntTask.test(task);
              })
              .forEach(function(task)
              {
                   grunt.loadNpmTasks(task);
              });
    };

    grunt.initConfig
        ({
            pkg: _packageJSON,

            copy:
            {
                temp:
                {
                    files: [{expand: true, cwd: _devDir, src: ['**'], dest: _tempDir}]
                },
                dist:
                {
                    files: [{expand: true, cwd: _tempDir + 'css/', src: ['estilo.min.css'], dest: _distDir + 'css/'},
                            {expand: true, cwd: _tempDir + 'img/', src: ['**'], dest: _distDir + 'img/'},
                            {expand: true, cwd: _tempDir + 'fonts/', src: ['**'], dest: _distDir + 'fonts/'},
                            {expand: true, cwd: _tempDir + 'partials/', src: ['**'], dest: _distDir + 'partials/'},
                            {expand: true, cwd: _tempDir + 'js/', src: ['frameworks.min.js'], dest: _distDir + 'js/'},
                            {expand: true, cwd: _tempDir + 'js/', src: ['lulz.min.js'], dest: _distDir + 'js/'},
                            {expand: true, cwd: _tempDir, src: ['index.html'], dest: _distDir}]
                }
            },

            clean:
            {
                temp:
                {
                    src: [_tempDir]
                },
                dist:
                {
                    src: [_distDir]
                }
            },

            cssmin:
            {
                build:
                {
                    files:
                    {
                        'client/temp/css/estilo.min.css': [_tempDir + 'bower_components/fontawesome/css/font-awesome.min.css',
                                                           _tempDir + 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                                                           _tempDir + 'css/fonts.css',
                                                           _tempDir + 'css/style.css',
                                                           _tempDir + 'css/positioning.css',
                                                           _tempDir + 'css/media_queries.css',
                                                           _tempDir + 'css/events.css']
                    }
                }
            },

            uglify:
            {
                build:
                {
                    files:
                    {
                        'client/temp/js/frameworks.min.js': [_tempDir + 'bower_components/jquery/dist/jquery.min.js',
                                                             _tempDir + 'bower_components/angular/angular.min.js',
                                                             _tempDir + 'bower_components/angular-socket-io/socket.min.js',
                                                             _tempDir + 'js/socket/socket.io.js',
                                                             _tempDir + 'bower_components/**/*.min.js'],

                        'client/temp/js/lulz.min.js': [_tempDir + 'js/application/lulz.js',
                                                       _tempDir + 'js/application/user/user.js',
                                                       _tempDir + 'js/application/post/post.js',
                                                       _tempDir + 'js/application/trophies/trophies.js',
                                                       _tempDir + 'js/application/**/*.js']
                    }
                }
            },

            usemin:
            {
                html: _tempDir + 'index.html'
            },

            replace:
            {
                build:
                {
                    options:
                    {
                        patterns: [{match: 'hash', replacement: '<%= new Date().getTime() %>'}]
                    },

                    files: [{src: [_tempDir + 'index.html'], dest: _tempDir + 'index.html'}]
                }
            },

            karma:
            {
                unit:
                {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            },

            less:
            {
                dist:
                {
                    files:
                    {
                        "client/temp/css/style.css":         "client/dev/css/style.less",
                        "client/temp/css/positioning.css":   "client/dev/css/positioning.less",
                        "client/temp/css/media_queries.css": "client/dev/css/media_queries.less",
                        "client/temp/css/events.css":        "client/dev/css/events.less"
                    }
                }
            }

        })

    // loader
    _loadGruntPlugins();

    // register
    grunt.registerTask('build', ['clean:temp', 'clean:dist', 'less', 'copy:temp', 'less', 'cssmin:build', 'uglify', 'usemin', 'replace', 'copy:dist', 'clean:temp']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('dist', ['karma:unit', 'clean:temp', 'clean:dist', 'less', 'copy:temp', 'less', 'cssmin:build', 'uglify', 'usemin', 'replace', 'copy:dist', 'clean:temp']);
}