"use strict";

(function(mongoose, User, Post)
{
    var _invalidStrings = function()
    {
        return [null, undefined, ' ', '', true, false, 0, 1, function(){}];
    }

    var _invalidObjects = function()
    {
        return [null, undefined, ' ', '', true, false, 0, 1, function(){}, {}, []];
    }

    var _invalidNumbers = function()
    {
        return [null, undefined, ' ', '', true, false, function(){}, {}, []];
    }

    var _createUser = function(array)
    {
        var DEFAULT_ARRAY = [{_id: '507f191e810c19729de860ea', username: 'aaa', password: 'b', type: "1"},
                             {_id: '507f191e810c19729de860eb', username: 'bbb', password: 'b', type: "1"},
                             {_id: '507f191e810c19729de860ec', username: 'ccc', password: 'b', type: "1"},
                             {_id: '507f191e810c19729de860ed', username: 'ericmdantas', password: '123', type: "9999"},
                             {_id: '507f191e810c19729de860ee', username: 'ddd', password: 'b', type: "1"}];

        var _array = array || DEFAULT_ARRAY;

        return User.create(_array);
    }

    var _createPost = function(array)
    {
        var DEFAULT_ARRAY = [{_id: '507f191e810c19729de860ea', title: 'titulo0', imageUrl: 'b0.jpg', description: "aehO0", author: '507f191e810c19729de860ea'},
                             {_id: '507f191e810c19729de860eb', title: 'titulo1', imageUrl: 'b1.jpg', description: "aehO1", author: '507f191e810c19729de860eb'},
                             {_id: '507f191e810c19729de860ec', title: 'titulo2', imageUrl: 'b2.jpg', description: "aehO2", author: '507f191e810c19729de860ec'},
                             {_id: '507f191e810c19729de860ed', title: 'titulo3', imageUrl: 'b3.jpg', description: "aehO3", author: '507f191e810c19729de860ed'},
                             {_id: '507f191e810c19729de860ee', title: 'titulo4', imageUrl: 'b4.jpg', description: "aehO4", author: '507f191e810c19729de860ee'}];

        var _array = array || DEFAULT_ARRAY;

        return Post.create(_array);
    }

    var _configMongoose = function()
    {
        mongoose.connect('mongodb://localhost/lulz_test');
        mongoose.connection.on('error', function(){});
        mongoose.models = {};
    }

    exports.invalidStrings = _invalidStrings;
    exports.invalidObjects = _invalidObjects;
    exports.invalidNumbers = _invalidNumbers;
    exports.createUser = _createUser;
    exports.createPost = _createPost;
    exports.configMongoose = _configMongoose;

}(require('mongoose'),
  require('../../../server/models/User'),
  require('../../../server/models/Post')));