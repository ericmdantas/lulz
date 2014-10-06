"use strict";

lulz.controller('UserController', ['UserService', 'User', function(UserService, User)
{
    var self = this;

    self.user = User.new();

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