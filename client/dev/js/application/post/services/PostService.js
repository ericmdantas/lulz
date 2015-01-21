"use strict";

angular
    .module('post')
    .service('PostService', ['$q', 'PostResource', 'Post', function($q, PostResource, Post)
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

            if (!angular.isString(id))
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
                .get({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        var _createPost = function(post)
        {
            var deferred = $q.defer();

            if (!angular.isObject(post) || !angular.isFunction(post.isInvalid) || post.isInvalid())
            {
                deferred.reject(new Error('Não é possível criar o post, objeto inválido.'));
                return deferred.promise;
            }

            var _onSuccess = function(post)
            {
                var _post = new Post(post);

                deferred.resolve(_post);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            PostResource
                .save(post)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        this.getAll = _getAll;
        this.getById = _getById;
        this.createPost = _createPost;
    }])