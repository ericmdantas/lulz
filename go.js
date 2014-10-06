"use strict";

var express = require('express');
var app = express();

var configurator = require('./config/configurator');
var db = require('./config/db');
var routes = require('./routes/routes');
var PORT = process.env.PORT || 8989;

db.init();
configurator.config(__dirname, express, app);
routes.init(express.Router(), app);

app.listen(PORT);

console.log('listening @ port %s', PORT);