"use strict";

(function(User)
{
    var _lookForUser = function(req, res)
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

        var _user = {username: req.query.username,
                     password: req.query.password};

        new User()
            .lookForUser(_user)
            .then(_onSuccess, _onError)
            .fail(_onException)
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

        new User()
            .createUser(req.body)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    exports.lookForUser = _lookForUser;
    exports.createUser = _createUser;

}(require('../models/User')))
