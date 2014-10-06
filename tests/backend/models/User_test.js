"use strict";

var expect = require('chai').expect;
var helper = require('../helper/helper');
var _User = require('../../../models/User');

describe('User', function()
{
    var _userInstance;

    before(helper.configMongoose);

    beforeEach(function()
    {
        _userInstance = new _User();
    })

    describe('lookForUser', function()
    {
        beforeEach(function(done)
        {
            helper
                .createUser()
                .then(function()
                {
                    done();
                })
        })

        afterEach(function(done)
        {
            _User.remove(done);
        })

        it('should reject with an error - object is invalid', function(done)
        {
            var _invalidUsers = helper.invalidObjects();

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível buscar o usuário, objeto inválido./);
            }

            for (var i = 0; i < _invalidUsers.length; i++)
            {
                _userInstance
                    .lookForUser(_invalidUsers[i])
                    .then(null, _onError);
            }

            done();
        })

        it('should reject with an error - username is invalid', function(done)
        {
            var _invalidUsernames = helper.invalidStrings();

            var _user = {username: null, password: 'a123'};

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível buscar o usuário, username inválido./);
            }

            for (var i = 0; i < _invalidUsernames.length; i++)
            {
                _user.username = _invalidUsernames[i];

                _userInstance
                    .lookForUser(_user)
                    .then(null, _onError);
            }

            done();
        })

        it('should reject with an error - password is invalid', function(done)
        {
            var _invalidPasswords = helper.invalidStrings();

            var _user = {username: 'eric', password: null};

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível buscar o usuário, password inválido./);
            }

            for (var i = 0; i < _invalidPasswords.length; i++)
            {
                _user.password = _invalidPasswords[i];

                _userInstance
                    .lookForUser(_user)
                    .then(null, _onError);
            }

            done();
        })

        it('should get the username correctly', function(done)
        {
            var _user = {username: 'ericmdantas', password: '123'};

            var _onSuccess = function(user)
            {
                expect(user).to.be.defined;
                expect(user).to.be.an.instanceof(_User);
                expect(user.username).to.be.defined;
                expect(user.type).to.be.defined;
                expect(user.smiles).to.be.defined;
                expect(user.password).not.to.exist;

                done();
            }

            _userInstance
                .lookForUser(_user)
                .then(_onSuccess);
        })
    })

    describe('createUser', function()
    {
        beforeEach(function(done)
        {
            helper
                .createUser()
                .then(function()
                {
                    done();
                })
        })

        afterEach(function(done)
        {
            _User.remove(done);
        })

        it('should not create user - username missing', function()
        {
            var _user = {username: null, password: 'a123', type: 'admin'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.username.message).to.match(/username .+ required/);
                done();
            }

            new _User()
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should not create user - password missing', function()
        {
            var _user = {username: 'eric', password: null, type: 'admin'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.username.message).to.match(/password .+ required/);
                done();
            }

            new _User()
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should not create user - type missing', function()
        {
            var _user = {username: 'eric', password: null, type: 1};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.username.message).to.match(/type .+ required/);
                done();
            }

            new _User()
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should not create user - type is not acceptable', function()
        {
            var _user = {username: 'eric', password: 'a123', type: "3"};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.username.message).to.match(/type .+ enum/);
                done();
            }

            new _User()
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should create user correctly', function()
        {
            var _user = {username: 'eric', password: 'a123', type: '1'};

            var _onSuccess = function(user)
            {
                expect(user).to.be.defined;
                expect(user.username).to.equal('eric');
                expect(user.password).to.equal('a123');
                expect(user.type).to.equal('1');
                done();
            }

            var _onError = function()
            {
                expect(false).to.be.true;
            }

            new _User()
                .createUser(_user)
                .then(_onSuccess, _onError);
        })
    })
})