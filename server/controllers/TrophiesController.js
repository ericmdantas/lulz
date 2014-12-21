"use strict";

(function(User)
{
    var _getAll = function(req, res)
    {
        var _onSuccess = function(users)
        {
            res
                .status(200)
                .send(users);
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
            .getAllTrophyInformation()
            .then(_onSuccess, _onError)
            .catch(_onException)
            .done();
    }

    exports.getAll = _getAll;

}(require('../models/User')))