"use strict";

var PORT = process.env.PORT || 8989;

var express = require('express');
var app = express();
var server = app.listen(PORT);
var io = require('socket.io').listen(server);

var configurator = require('./config/configurator');
var db = require('./config/db');
var routes = require('./routes/routes');

db.init();
configurator.config(__dirname, express, app);
routes.init(express.Router(), app);

io.on('connection', function(socket)
{
    socket.on('post:smile', function(post)
    {
        console.log(post);
    })
})

console.log('listening @ port %s', PORT);