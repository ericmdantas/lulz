"use strict";

(function(postController)
{
    var _init = function(io)
    {
        io.on('connection', function(client)
        {
            client.on('post:smile', function(id)
            {
                postController.likePost(io, id)
            });
        });
    }

    exports.init = _init;

}(require('../controllers/PostController')))
