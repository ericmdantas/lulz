"use strict";

var expect = require('chai').expect;
var helper = require('../helper/helper');
var _User = require('../../../server/models/User');

describe('User', function()
{
    var _userInstance;

    before(helper.configMongoose);

    beforeEach(function()
    {
        _userInstance = new _User();
    })

    describe('getAllTrophyInformation', function()
    {
        beforeEach(function(done)
        {
            var _users = [];

            for (var i = 0; i < 150; i++)
            {
                if (i < 10)
                    _users.push({_id: '507f191e810c19729de860e' + i, username: 'aaa'+i, password: 'b'+i, type: "1", smiles: i});
                else
                    if (i < 100)
                        _users.push({_id: '507f191e810c19729de860' + i, username: 'aaa'+i, password: 'b'+i, type: "1", smiles: i});
                    else
                        _users.push({_id: '507f191e810c19729de86' + i, username: 'aaa'+i, password: 'b'+i, type: "1", smiles: i});
            }

            helper
                .createUser(_users)
                .then(function()
                {
                    done();
                });
        })

        afterEach(function(done)
        {
            _User.remove(done);
        })

        it('should return the top 100 users', function(done)
        {
            var _onSuccess = function(users)
            {
                expect(users).to.be.defined;
                expect(users[0]).to.be.defined;
                expect(users[0].smiles).to.equal(149);
                expect(users[users.length - 1].smiles).to.equal(50);

                done();
            }

            var _onError = function(error)
            {
                done();
            }

            _User
                .getAllTrophyInformation()
                .then(_onSuccess, _onError);
        })
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
                _User
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

                _User
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

                _User
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
                expect(user).not.to.have.property('password');
                expect(user).to.have.property('_id');
                expect(user).to.have.property('username').and.to.equal('ericmdantas');
                expect(user).to.have.property('type').and.to.equal('9999');
                expect(user).to.have.property('smiles').and.to.equal(0);

                done();
            }

            _User
                .lookForUser(_user)
                .then(_onSuccess);
        })
    })

    describe('getById', function()
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

        it('should reject with an error, id is invalid', function(done)
        {
            var _invalidIds = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível buscar o usuário pelo id, string inválida./);
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _User
                    .getById(_invalidIds[i])
                    .then(null, _onError);
            }

            done();
        })

        it('should get the user correctly', function(done)
        {
            var _id = '507f191e810c19729de860ed';

            var _onSuccess = function(user)
            {
                expect(user).to.be.defined;
                expect(user).to.have.property('username').and.to.equal('ericmdantas');
                expect(user).to.have.property('type').and.to.equal('9999');
                expect(user).to.not.have.property('password');

                done();
            }

            _User
                .getById(_id)
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

        it('should not create user - username missing', function(done)
        {
            var _user = {username: null, password: 'a123', type: 'admin'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                done();
            }

            _User
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should not create user - password missing', function(done)
        {
            var _user = {username: 'eric', password: null, type: 'admin'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                done();
            }

            _User
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should not create user - type missing', function(done)
        {
            var _user = {username: 'eric', password: null, type: 1};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                done();
            }

            _User
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should not create user - type is not acceptable', function(done)
        {
            var _user = {username: 'eric', password: 'a123', type: "3"};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                done();
            }

            _User
                .createUser(_user)
                .then(_onSuccess, _onError);
        })

        it('should create user correctly', function(done)
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

            _User
                .createUser(_user)
                .then(_onSuccess, _onError);
        })
    })
})