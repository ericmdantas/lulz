"use strict";

var lulz = angular
            .module('lulz', ['ngResource',
                             'ngTouch',
                             'ngRoute',
                             'btford.socket-io',
                             'emd.ng-xtorage',
                             'user',
                             'post'])

            .constant('POST_LIMIT', 100)
            .constant('BASE_PROTECTED_API', '/api/protected/')
            .constant('OPTIONS', [{icon: 'home', location: '/'},
                                  {icon: 'user', location: '/user'},
                                  {icon: 'pencil', modal: {id: "#post-modal"}}]);