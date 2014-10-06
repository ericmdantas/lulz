"use strict";

lulz.controller('PostController', ['Post', 'PostService', function(Post, PostService)
{
    var self = this;

    self.post = Post.new();

    self.createPost = function(post)
    {
        var _onSuccess = function()
        {
            self.post = Post.new();
        }

        PostService
            .createPost(post)
            .then(_onSuccess);
    }
}])