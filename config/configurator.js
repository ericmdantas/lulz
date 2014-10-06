"use strict";

(function(morgan, bodyParser, cookieParser)
{
    var _config = function(dir, express, app)
    {
        app.use(express.static(dir + '/public'));
        app.use(morgan('dev'));
        app.use(bodyParser());
        app.use(cookieParser('test'));
    }

    exports.config = _config;

}(require('morgan'),
  require('body-parser'),
  require('cookie-parser')))