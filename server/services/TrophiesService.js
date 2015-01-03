"use strict";

(function(Promise, _, User, Post)
{
    var _getTrophies = function()
    {
        var deferred = Promise.pending();

        var _onSuccess = function(users)
        {
            deferred.resolve(users);
        }

        var _onError = function(error)
        {
            deferred.reject(error);
        }

        var _onException = function(ex)
        {
            deferred.reject(ex);
        }

        User
            .getTrophiesInfo()
            .then(_onSuccess, _onError)
            .catch(_onException)
            .done();

        return deferred.promise;
    }

    exports.getTrophies = _getTrophies;

}(require('bluebird'),
  require('lodash'),
  require('../models/User'),
  require('../models/Post')));