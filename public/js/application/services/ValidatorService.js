"use strict";

var validator = {};

(function(exports)
{
    var _isStringInvalid = function(str)
    {
        return ("string" !== typeof str) || (!str.length) || (!str.trim().length);
    }

    var _isNumberInvalid = function(num)
    {
        if (num === 0)
            return false;

        return ("number" !== typeof num);
    }

    var _isObjectInvalid = function(obj)
    {
        return ("object" !== typeof obj) || (!obj) || (!Object.keys(obj).length);
    }

    exports.isStringInvalid = _isStringInvalid;
    exports.isNumberInvalid = _isNumberInvalid;
    exports.isObjectInvalid = _isObjectInvalid;

}('undefined' === typeof exports ? validator : exports))