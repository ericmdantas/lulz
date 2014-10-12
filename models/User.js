"use strict";

(function(mongoose, q, userSchema, validator)
{
    userSchema.methods.lookForUser = function(user)
    {
        var deferred = q.defer();

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

    userSchema.methods.getById = function(id)
    {
        var deferred = q.defer();

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

    userSchema.methods.createUser = function(user)
    {
        var deferred = q.defer();

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

}(require('mongoose'), require('q'), require('../schemas/UserSchema').UserSchema, require('../services/ValidatorService')))

