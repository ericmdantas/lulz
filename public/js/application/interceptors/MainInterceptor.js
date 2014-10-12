"use strict";

lulz.config(['$provide', '$httpProvider', function($provide, $httpProvider)
{
    $provide.service('MainInterceptor', ['$q', 'StorageService', function($q, StorageService)
    {
        var _request = function(config)
        {
            return config || $q.when(config);
        }

        var _requestError = function(rejection)
        {
            return $q.reject(rejection);
        }

        var _response = function(response)
        {
            return response || $q.when(response);
        }

        var _responseError = function(rejection)
        {
            return $q.reject(rejection);
        }

        this.request = _request;
        this.requestError = _requestError;
        this.response = _response;
        this.responseError = _responseError;
    }]);

    $httpProvider.interceptors.push('MainInterceptor');
}])