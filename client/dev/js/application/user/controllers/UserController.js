"use strict";

angular
    .module('user')
    .controller('UserController', ['$xtorage', 'UserService', 'User', function($xtorage, UserService, User)
    {
        var self = this;

        self.user = User.new($xtorage.get('U'));

        self.save = function(user)
        {
            var _onSuccess = function(user)
            {
                self.user = user;
            }

            UserService
                .createUser(user)
                .then(_onSuccess);
        }

        self.login = function(user)
        {
            var _onSuccess = function(user)
            {
                self.user = user;
            }

            UserService
                .login(user)
                .then(_onSuccess);
        }
    }])