"use strict";

(function(mongoose)
{
    var _postSchema = mongoose.Schema
    ({
        title: {type: String, required: true, trim: true, lowercase: true},
        imageUrl: {type: String, required: true, trim: true, lowercase: true},
        description: {type: String, trim: true, lowercase: true},
        smiles: {type: Number, default: 0},
        createdAt: {type: Date, default: Date.now},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: '54315c1ef566b8ac1dd03831'},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    });

    exports.PostSchema = _postSchema;

}(require('mongoose')))