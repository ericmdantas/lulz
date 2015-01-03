"use strict";

(function(User, Auth)
{
    var _lookForUser = function(req, res)
    {
        var _onSuccess = function(user)
        {
            Auth.authenticate(res, user._id);

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

        var _onException = function(ex)
        {
            res
                .status(500)
                .send(ex);
        }

        var _user = {};

        _user.username = req.body.username;
        _user.password = req.body.password;

        User
            .lookForUser(_user)
            .then(_onSuccess, _onError)
            .catch(_onException)
            .done();
    }

    var _createUser = function(req, res)
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

        var _onException = function(ex)
        {
            res
                .status(500)
                .send(ex);
        }

        User
            .createUser(req.body)
            .then(_onSuccess, _onError)
            .catch(_onException)
            .done();
    }

    exports.lookForUser = _lookForUser;
    exports.createUser = _createUser;

}(require('../models/User'),
  require('../services/Authentication')))
