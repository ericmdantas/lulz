"use strict";

(function(mongoose)
{
    var _init = function()
    {
        var _urlBanco = 'mongodb://localhost/lulz';
        var _db = mongoose.connection;

        mongoose.connect(_urlBanco);
        _db.on('error', console.error.bind(console, 'erro na conexão com o banco'));
    }

    exports.init = _init;

}(require('mongoose')))