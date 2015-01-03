"use strict";

(function(mongoose, Promise, userSchema, validator)
{
    userSchema.statics.getTrophiesInfo = function()
    {
        var deferred = Promise.pending();

        var MAX_INFORMATION = 100;

        var _query = {};
        var _projection = {};

        User
            .find(_query, _projection)
            .select('username createdAt posts')
            .sort('-posts.smiles')
            .limit(MAX_INFORMATION)
            .exec(function(err, users)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(users);
            });

        return deferred.promise;
    }

    userSchema.statics.getAllTrophyInformation = function()
    {
        var MAX_TROPHY_RESULTS = 100;

        var deferred = Promise.pending();

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
                err ? deferred.reject(err)
                    : deferred.resolve(users);
            })

        return deferred.promise;

    }

    userSchema.statics.lookForUser = function(user)
    {
        var deferred = Promise.pending();

        if (validator.isObjectInvalid(user))
        {
            deferred.reject(new Error('Não é possível buscar o usuário, objeto inválido.'));
            return deferred.promise;
        }

        if (validator.isStringInvalid(user.username))
        {
            deferred.reject(new Error('Não é possível buscar o usuário, username inválido.'));
            return deferred.promise;
        }

        if (validator.isStringInvalid(user.password))
        {
            deferred.reject(new Error('Não é possível buscar o usuário, password inválido.'));
            return deferred.promise;
        }

        var _query = {username: user.username,
                      password: user.password};

        User
            .findOne(_query)
            .select('-password')
            .exec(function(err, user)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(user);
            })

        return deferred.promise;
    }

    userSchema.statics.getById = function(id)
    {
        var deferred = Promise.pending();

        if (validator.isStringInvalid(id))
        {
            deferred.reject(new Error('Não é possível buscar o usuário pelo id, string inválida.'));
            return deferred.promise;
        }

        User
            .findById(id)
            .select('-password')
            .exec(function(err, user)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(user);
            })

        return deferred.promise;
    }

    userSchema.statics.createUser = function(user)
    {
        var deferred = Promise.pending();

        var _onSave = function(error, saved)
        {
            error ? deferred.reject(error)
                  : deferred.resolve(saved);
        }

        new User(user)
            .save(_onSave);

        return deferred.promise;
    }

    var User = mongoose.model('User', userSchema);

    module.exports = User;

}(require('mongoose'),
  require('bluebird'), require('../schemas/UserSchema').UserSchema, require('../services/ValidatorService')))

