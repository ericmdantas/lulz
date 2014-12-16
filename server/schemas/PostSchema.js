"use strict";

(function(mongoose)
{
    var _postSchema = mongoose.Schema
    ({
        title: {type: String, required: true, trim: true, lowercase: true, index: true},
        imageUrl: {type: String, required: true, trim: true},
        description: {type: String, trim: true, lowercase: true},
        smiles: {type: Number, default: 0},
        createdAt: {type: Date, default: Date.now},
        author: {type: mongoose.Schema.Types.ObjectId, required: true, trim: true, index: true},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    });

    exports.PostSchema = _postSchema;

}(require('mongoose')))