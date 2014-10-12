"use strict";

lulz.controller('MainController', ['PostService', 'SocketService', function(PostService, SocketService)
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

    self.smileAtPost = function(id)
    {
        SocketService.emit('post:smile', {postId: id});
    }

    _getPosts();
}])