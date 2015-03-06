"use strict";

var mongoose = require('mongoose');
var Promise = require('bluebird');
var userSchema = require('../schemas/UserSchema').UserSchema;
var _ = require('lodash');


userSchema.statics.getAllTrophyInformation = function()
{
    var MAX_TROPHY_RESULTS = 100;

    return new Promise(function(resolve, reject)
    {
        var _query = {};
        var _projection = {};

        var _returnThese = '_id username createdAt smiles';
        var _sortBy = '-smiles';

        User
            .find(_query, _projection)
            .sort(_sortBy)
            .select(_returnThese)
            .limit(MAX_TROPHY_RESULTS)
            .exec(function(err, users)
            {
                err ? reject(err)
                    : resolve(users);
            })
    });

}

userSchema.statics.lookForUser = function(user)
{
    return new Promise(function(resolve, reject)
    {
        if (!_.isObject(user) || !Object.keys(user).length)
        {
            return reject(new Error('Não é possível buscar o usuário, objeto inválido.'));
        }

        if (!_.isString(user.username))
        {
            return reject(new Error('Não é possível buscar o usuário, username inválido.'));
        }

        if (!_.isString(user.password))
        {
            return reject(new Error('Não é possível buscar o usuário, password inválido.'));
        }

        var _query = {username: user.username,
                      password: user.password};

        User
            .findOne(_query)
            .select('-password')
            .exec(function(err, user)
            {
                err ? reject(err)
                    : resolve(user);
            });
    })
}

userSchema.statics.getById = function(id)
{
    return new Promise(function(resolve, reject)
    {
        if (!_.isString(id))
        {
            return reject(new Error('Não é possível buscar o usuário pelo id, string inválida.'));
        }

        User
            .findById(id)
            .select('-password')
            .exec(function(err, user)
            {
                err ? reject(err)
                    : resolve(user);
            })
    })
}

userSchema.statics.createUser = function(user)
{
    return new Promise(function(resolve, reject)
    {
        var _onSave = function(error, saved)
        {
            error ? reject(error)
                  : resolve(saved);
        }

        new User(user)
            .save(_onSave);
    });
}

var User = mongoose.model('User', userSchema);

module.exports = User;