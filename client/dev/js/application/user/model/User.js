"use strict";

angular
    .module('user')
    .factory('User', [function()
    {
        var DEFAULT_USER =
        {
            _id: null,
            username: null,
            password: null,
            type: '1',
            smiles: 0,
            posts: [],
            comments: [],
            language: 'EN'
        }

        var User = function(info)
        {
            var _info = info || DEFAULT_USER;
            angular.extend(this, _info);
        }

        User.new = function(info)
        {
            return new User(info);
        };

        User.prototype =
        {
            isNew: function()
            {
                return !this._id;
            },

            isInvalid: function()
            {
                var _isUsernameInvalid = !angular.isString(this.username);
                var _isLanguageInvalid = !angular.isString(this.language);
                var _isTypeInvalid = !angular.isString(this.type);

                return (_isUsernameInvalid || _isLanguageInvalid || _isTypeInvalid);
            }
        }

        return User;
    }])