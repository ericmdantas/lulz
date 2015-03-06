"use strict";

var fs = require('fs');

var ContentController = function(){}

var _send = function(res, html)
{
    var _info = null;

    fs
        .createReadStream(html)
        .on('data', function(chunk)
        {
            _info += chunk;
        })
        .on('end', function()
        {
            res.setHeader('Content-Type', 'text/html');
            res.send(_info);
        })
}

ContentController.sendMainPage = function(req, res)
{
    _send(res, './client/dist/index.html');
}

module.exports = ContentController;