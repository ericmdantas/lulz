"use strict";

var lulz = angular
            .module('lulz', ['ngResource', 'ngTouch', 'ngRoute', 'user', 'post', 'btford.socket-io'])
            .constant('POST_LIMIT', 100)
            .constant('BASE_PROTECTED_API', '/api/protected/')
            .constant('OPTIONS', [{icon: 'home', location: '/'},
                                  {icon: 'user', location: '/user'},
                                  {icon: 'pencil', location: '/post'},
                                  {icon: 'globe', location: '/language'},
                                  {icon: 'info', location: '/info'}]);