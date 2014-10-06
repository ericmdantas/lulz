"use strict";

lulz.factory('PostResource', ['$resource', 'BASE_PROTECTED_API', function($resource, BASE_PROTECTED_API)
{
    var _url = BASE_PROTECTED_API + 'post/:id';
    var _params = {};
    var _methods = {};

    return $resource(_url, _params, _methods);
}])