"use strict";

var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash');
var postSchema = require('../schemas/PostSchema').PostSchema;

postSchema.statics.getAll = function()
{
    return new Promise(function(resolve, reject)
    {
        var _query = {};

        Post
            .find(_query)
            .populate('author', 'username')
            .exec(function(error, posts)
            {
                error ? reject(error)
                      : resolve(posts);
            });
    })

}

postSchema.statics.getById = function(id)
{
    return new Promise(function(resolve, reject)
    {
        if (!_.isString(id))
        {
            return reject(new Error('Não é possível buscar pelo post, id inválido.'));
        }

        Post
            .findById(id)
            .exec(function(err, post)
            {
                err ? reject(err)
                    : resolve(post);
            });
    })
}

postSchema.statics.createPost = function(post)
{
    return new Promise(function(resolve, reject)
    {
        var _onSave = function(error, saved)
        {
            error ? reject(error)
                  : resolve(saved);
        }

        new Post(post)
            .save(_onSave);
    });
}

postSchema.statics.likePost = function(id)
{
    return new Promise(function(resolve, reject)
    {
        if (!_.isString(id))
        {
            return reject(new Error('Não é possível curtir o post em questão, id inválido.'));
        }

        var _update = {$inc: {smiles: 1}};

        Post
            .findByIdAndUpdate(id, _update)
            .select('_id smiles')
            .exec(function(err, updated)
            {
                err ? reject(err)
                    : resolve(updated);
            });
    })
}

var Post = mongoose.model('Post', postSchema);

module.exports = Post;