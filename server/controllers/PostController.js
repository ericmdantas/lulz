"use strict";

var PostDAO = require('../dal/PostDAO');

var PostController = function(){}

PostController.getAll = function(req, res)
{
    var _onSuccess = function(posts)
    {
        res
            .status(200)
            .send(posts);
    }

    var _onError = function(error)
    {
        res
            .status(400)
            .send(error);
    }

    PostDAO
        .getAll()
        .then(_onSuccess)
        .catch(_onError)
        .done();
}


PostController.getById = function(req, res)
{
    var _onSuccess = function(post)
    {
        res
            .status(200)
            .send(post);
    }

    var _onError = function(error)
    {
        res
            .status(400)
            .send(error);
    }

    var _onException = function(ex)
    {
        res
            .status(500)
            .send(ex);
    }

    PostDAO
        .getById(req.params.id)
        .then(_onSuccess)
        .catch(_onError)
        .done();
}

PostController.createPost = function(req, res)
{
    var _onSuccess = function(post)
    {
        res
            .status(201)
            .json(post);
    }

    var _onError = function(error)
    {
        res
            .status(400)
            .send(error);
    }

    var _onException = function(ex)
    {
        res
            .status(500)
            .send(ex);
    }

    var _post = req.body;
    _post.author = (req.cookies && req.cookies.token) ? req.cookies.token : null;

    PostDAO
        .createPostDAO(_post)
        .then(_onSuccess)
        .catch(_onError)
        .done();
}


PostController.likePost = function(io, id)
{
    var _onSuccess = function(post)
    {
        io.emit('post:smiledAt', post);
    }

    PostDAO
        .likePost(id)
        .then(_onSuccess);
}

module.exports = PostController;