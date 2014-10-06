"use strict";

lulz.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', {templateUrl: 'partials/main.html', controller: 'MainController', controllerAs: 'mainCtrl'})
        .when('/user', {templateUrl: 'partials/user.html', controller: 'UserController', controllerAs: 'userCtrl'})
        .when('/post', {templateUrl: 'partials/post.html', controller: 'PostController', controllerAs: 'postCtrl'})
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}])