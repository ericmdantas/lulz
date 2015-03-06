"use strict";

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var contentLength = require('express-content-length-validator');

var _config = function(dir, express, app)
{
    app.use(express.static(dir + '/client/dist'));
    app.use(morgan('dev'));
    app.use(contentLength.validateMax({max: 333}));
    app.use(bodyParser());
    app.use(cookieParser('secretgoesheeeeeeeere'));
}

exports.config = _config;