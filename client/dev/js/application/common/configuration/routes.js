"use strict";

lulz.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', {templateUrl: 'partials/views/home.html', controller: 'HomeController', controllerAs: 'homeCtrl'})
        .when('/user', {templateUrl: 'partials/views/user.html', controller: 'UserController', controllerAs: 'userCtrl'})
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}])