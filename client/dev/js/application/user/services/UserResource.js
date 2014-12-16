"use strict";

angular
    .module('user')
    .factory('UserResource', ['$resource', 'BASE_PROTECTED_API', function($resource, BASE_PROTECTED_API)
    {
        var _url = BASE_PROTECTED_API + 'user';
        var _params = {};
        var _methods = {};

        return $resource(_url, _params, _methods);
    }])