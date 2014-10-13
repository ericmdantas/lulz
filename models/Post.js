"use strict";

(function(mongoose, q, postSchema, validator)
{
    postSchema.methods.getAll = function()
    {
        var deferred = q.defer();
        var _query = {};

        Post
            .find(_query)
            .exec(function(error, posts)
            {
                error ? deferred.reject(error)
                    : deferred.resolve(posts);
            })

        return deferred.promise;
    }

    postSchema.methods.getById = function(id)
    {
        var deferred = q.defer();

        if (validator.isStringInvalid(id))
        {
            deferred.reject(new Error('Não é possível buscar pelo post, id inválido.'))
            return deferred.promise;
        }

        Post
            .findById(id)
            .exec(function(err, post)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(post);
            })

        return deferred.promise;
    }

    postSchema.methods.createPost = function(post)
    {
        var deferred = q.defer();

        var _onSave = function(error, saved)
        {
            error ? deferred.reject(error)
                  : deferred.resolve();
        }

        new Post(post)
            .save(_onSave);

        return deferred.promise;
    }

    postSchema.methods.likePost = function(id)
    {
        var deferred = q.defer();

        if (validator.isStringInvalid(id))
        {
            deferred.reject(new Error('Não é possível curtir o post em questão, id inválido.'));
            return deferred.promise;
        }

        var _update = {$inc: {smiles: 1}};

        Post
            .findByIdAndUpdate(id, _update)
            .select('_id smiles')
            .exec(function(err, updated)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(updated);
            })

        return deferred.promise;
    }

    var Post = mongoose.model('Post', postSchema);

    module.exports = Post;

}(require('mongoose'),
  require('q'),
  require('../schemas/PostSchema').PostSchema,
  require('../services/ValidatorService')))