"use strict";

(function(fs)
{
    var _send = function(res, html)
    {
        fs.readFile(html, function(err, html)
        {
            if (err)
                throw err;

            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        });
    }

    var _sendMainPage = function(req, res)
    {
        _send(res, './client/dist/index.html');
    }

    exports.sendMainPage = _sendMainPage;

}(require('fs')))