"use strict";

angular
    .module('user')
    .service('UserService', ['$q', 'UserResource', 'StorageService', function($q, UserResource, StorageService)
    {
        var _login = function(user)
        {
            var deferred = $q.defer();

            if (!angular.isObject(user) || !angular.isFunction(user.isInvalid) || user.isInvalid())
            {
                deferred.reject(new Error('Usuário informado não é válido. Não é possível fazer login.'));
                return deferred.promise;
            }

            var _onSuccess = function(user)
            {
                var _user = user || {};

                StorageService.save('U', _user);

                deferred.resolve(_user);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            UserResource
                .get(user)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        var _createUser = function(user)
        {
            var deferred = $q.defer();

            if (!angular.isObject(user) || !angular.isFunction(user.isInvalid) || user.isInvalid())
            {
                deferred.reject(new Error('Usuário não é válido. Não é possível cadastrá-lo.'));
                return deferred.promise;
            }

            var _onSuccess = function(data)
            {
                var _user = data || {};

                deferred.resolve(_user);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            UserResource
                .save(user)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        this.login = _login;
        this.createUser = _createUser;

    }])