"use strict";

angular
    .module('user')
    .service('UserService', ['$q', '$xtorage', 'UserResource', 'User', function($q, $xtorage, UserResource, User)
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
                console.log(user);

                var _user = new User(user);

                console.log(_user);

                $xtorage.save('U', _user);

                deferred.resolve(_user);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            UserResource
                .login(user)
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

            var _onSuccess = function(user)
            {
                var _user = new User(user);

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