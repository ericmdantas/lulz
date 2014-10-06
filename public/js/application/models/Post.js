"use strict";

lulz.factory('Post', [function()
{
    var DEFAULT_POST =
    {
        _id: null,
        title: null,
        imageUrl: null,
        author: null,
        comments: null,
        smiles: 0,
        language: 'EN'
    }

    var Post = function(info)
    {
        var _info = info || DEFAULT_POST;
        angular.extend(this, _info);
    }

    Post.new = function(info)
    {
        return new Post(info);
    }

    Post.prototype =
    {
        isNew: function()
        {
            return !this._id;
        },

        isInvalid: function()
        {
            var _isTitleInvalid = validator.isStringInvalid(this.title);
            var _isImageUrl = validator.isStringInvalid(this.imageUrl);
            //var _isAuthorInvalid = validator.isStringInvalid(this.author);
            var _isLanguage = validator.isStringInvalid(this.language);

            return (_isTitleInvalid || _isImageUrl || _isLanguage) //|| _isAuthorInvalid);
        }
    }

    return Post;
}])