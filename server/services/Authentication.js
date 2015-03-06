"use strict";

var UserDAO = require('../dal/UserDAO');

var _authenticate = function(res, token)
{
    const _expirationDate = 14 * 24 * 3600000; //2 weeks
    const KEY = 'token';

    res.cookie(KEY, token, {expires: new Date(Date.now() + _expirationDate), httpOnly: true});
}

var _isLoggedIn = function(req, res, next)
{
    var _onSuccess = function()
    {
        next();
    }

    var _onError = function()
    {
        res
            .status(403)
            .end();
    }

    var _token = (req.cookies && req.cookies.token) ? req.cookies.token
                                                    : null;

    if (!_token)
    {
        _onError();
        return;
    }

    UserDAO
        .getById(_token)
        .then(_onSuccess, _onError);
}

exports.authenticate = _authenticate;
exports.isLoggedIn = _isLoggedIn;