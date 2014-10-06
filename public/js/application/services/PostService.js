"use strict";

lulz.service('PostService', ['$q', 'PostResource', function($q, PostResource)
{
    var _getAll = function()
    {
        var deferred = $q.defer();

        var _onSuccess = function(posts)
        {
            var _posts = posts || [];

            deferred.resolve(_posts);
        }

        var _onError = function(error)
        {
            deferred.reject(error);
        }

        PostResource
            .query()
            .$promise
            .then(_onSuccess, _onError);

        return deferred.promise;
    }

    var _getById = function(id)
    {
        var deferred = $q.defer();

        if (validator.isStringInvalid(id))
        {
            deferred.reject(new Error('Não é possível buscar o post, id inválido.'));
            return deferred.promise;
        }

        var _onSuccess = function(post)
        {
            var _post = post || {};

            deferred.resolve(_post);
        }

        var _onError = function(error)
        {
            deferred.reject(error);
        }

        PostResource
            .get(id)
            .$promise
            .then(_onSuccess, _onError);

        return deferred.promise;
    }

    var _createPost = function(post)
    {
        var deferred = $q.defer();

        if (post.isInvalid())
        {
            deferred.reject(new Error('Não é possível criar o post, objeto inválido.'));
            return deferred.promise;
        }

        var _onSuccess = function()
        {
            deferred.resolve();
        }

        var _onError = function(error)
        {
            deferred.reject(error);
        }

        PostResource
            .save(post)
            .then(_onSuccess, _onError);

        return deferred.promise;
    }

    this.createPost = _createPost;
    this.getAll = _getAll;
    this.getById = _getById;
}])