"use strict";

(function(mongoose)
{
    var _userSchema = mongoose.Schema
    ({
        username: {type: String, required: true, unique: true, trim: true, index: true},
        password: {type: String, required: true, trim: true},
        createdAt: {type: Date, default: Date.now},
        type: {type: String, required: true, enum: [1, 10, 100, 9999], index: true},
        smiles: {type: Number, default: 0}
    });

    exports.UserSchema = _userSchema;

}(require('mongoose')))