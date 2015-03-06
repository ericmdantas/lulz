"use strict";

var UserDAO = require('../dal/UserDAO');
var Auth = require('../services/Authentication');

var UserController = function(){};

UserController.lookForUser = function(req, res)
{
    var _onSuccess = function (user) {
        Auth.authenticate(res, user._id);

        res
            .status(200)
            .send(user);
    }

    var _onError = function (error) {
        res
            .status(400)
            .send(error);
    }

    var _user = {};

    _user.username = req.body.username;
    _user.password = req.body.password;

    UserDAO
        .lookForUser(_user)
        .then(_onSuccess)
        .catch(_onError)
        .done();
}

UserController.createUser = function(req, res)
{
    var _onSuccess = function(user)
    {
        res
            .status(200)
            .send(user);
    }

    var _onError = function(error)
    {
        res
            .status(400)
            .send(error);
    }

    UserDAO
        .createUser(req.body)
        .then(_onSuccess)
        .catch(_onError)
        .done();
}

module.exports = UserController;
