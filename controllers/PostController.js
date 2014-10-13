"use strict";

(function(Post)
{
    var _getAll = function(req, res)
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

        var _onException = function(ex)
        {
            res
                .status(500)
                .send(ex);
        }

        new Post()
            .getAll()
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _getById = function(req, res)
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

        new Post()
            .getById(req.params.id)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _createPost = function(req, res)
    {
        var _onSuccess = function()
        {
            res
                .status(200)
                .end();
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

        new Post()
            .createPost(_post)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _likePost = function(io, id)
    {
        var _onSuccess = function(post)
        {
            io.emit('post:smiledAt', post);
        }

        new Post()
            .likePost(id)
            .then(_onSuccess);
    }

    exports.getAll = _getAll;
    exports.getById = _getById;
    exports.createPost = _createPost;
    exports.likePost = _likePost;

}(require('../models/Post')))