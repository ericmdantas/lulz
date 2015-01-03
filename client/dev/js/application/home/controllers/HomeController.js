"use strict";

lulz.controller('HomeController', ['PostService', 'SocketService', function(PostService, SocketService)
{
    var self = this;

    var _getPosts = function()
    {
        var _onSuccess = function(posts)
        {
            self.posts = posts;
        }

        PostService
            .getAll()
            .then(_onSuccess);
    }

    var _listenSocket = function()
    {
        SocketService.on('post:smiledAt', function(obj)
        {
            for (var i = 0; i < self.posts.length; i++)
            {
                if (self.posts[i]._id === obj._id)
                {
                    self.posts[i].smiles = obj.smiles;
                    break;
                }
            }
        })
    }

    self.smileAtPost = function(id)
    {
        if (angular.isString(id))
            SocketService.emit('post:smile', id);
    }

    self.loadMore = function()
    {
        alert('eae :D');
    }

    _getPosts();
    _listenSocket();
}])