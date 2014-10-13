"use strict";

var PORT = process.env.PORT || 8989;

var express = require('express');
var app = express();
var server = app.listen(PORT);
var socket = require('./socket/socket');
var io = require('socket.io').listen(server);

var configurator = require('./config/configurator');
var db = require('./config/db');
var routes = require('./routes/routes');

db.init();
configurator.config(__dirname, express, app);
routes.init(express.Router(), app);
socket.init(io);

console.log('listening @ port %s', PORT);