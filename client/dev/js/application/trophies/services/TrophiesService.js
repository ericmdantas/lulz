"use strict";

angular
    .module('trophies')
    .factory('TrophiesResource', ['$resource', function($resource)
    {
        var _url = '/api/trophies/';
        var _params = {};
        var _methods = {};

        return $resource(_url, _params, _methods);
    }])
    .service('TrophiesService', ['$q', 'TrophiesResource', function($q, TrophiesResource)
    {
        var _getTop = function()
        {
            var deferred = $q.defer();

            var _onSuccess = function(trophies)
            {
                var _trophies = trophies || [];

                deferred.resolve(_trophies);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            TrophiesResource
                .query()
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        this.getTop = _getTop;
    }]);