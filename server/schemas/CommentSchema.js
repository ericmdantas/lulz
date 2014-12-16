"use strict";

(function(mongoose)
{
    var _commentSchema = mongoose.Schema
    ({
        author: {type: String, required: true, lowercase: true, trim: true, index: true},
        comment: {type: String, required: true, lowercase: true, trim: true},
        smiles: {type: Number, default: 0}
    });

    exports.CommentSchema = _commentSchema;

}(require('mongoose')))
