"use strict";

(function(TrophiesService)
{
    var _getAll = function(req, res)
    {
        var _onSuccess = function(trophies)
        {
            res
                .status(200)
                .send(trophies);
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

        TrophiesService
            .getTrophies()
            .then(_onSuccess, _onError)
            .catch(_onException)
            .done();
    }

    exports.getAll = _getAll;

}(require('../services/TrophiesService')))