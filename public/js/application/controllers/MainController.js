"use strict";

lulz.controller('MainController', ['PostService', function(PostService)
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

    _getPosts();
}])