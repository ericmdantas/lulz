"use strict";

describe('UserService', function()
{
    var _UserService,
        _User,
        _userInstance,
        _httpMock,
        _API,
        _userAPI;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _UserService = $injector.get('UserService');
        _User = $injector.get('User');
        _userInstance = _User.new();
        _httpMock = $injector.get('$httpBackend');
        _API = $injector.get('BASE_PROTECTED_API');
        _userAPI = _API + 'user';
    }))

    describe('login', function()
    {
        it('should reject with an error, user is invalid', function()
        {
            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).match(/Usuário informado não é válido. Não é possível fazer login./);
            }

            _UserService
                .login(_userInstance)
                .then(null, _onError);
        })

        it('should make the request correctly, server returns error', function()
        {
            _userInstance.username = 'eric';
            _userInstance.password = 'a123';

            _httpMock.expectGET(_userAPI + '?username=eric&password=a123').respond(500, {message: 'erro'});

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.message).toEqual('erro');
            }

            _UserService
                .login(_userInstance)
                .then(null, _onError);
        })

        it('should make the request correctly', function()
        {
            _userInstance.username = 'eric';
            _userInstance.password = 'a123';

            _httpMock.expectGET(_userAPI + '?username=eric&password=a123').respond({_id: 'a123', username: 'eric', type: "9999", smiles: 99});

            var _onSuccess = function(user)
            {
                expect(user).toBeDefined();
                expect(user._id).toEqual('a123');
                expect(user.username).toEqual('eric');
                expect(user.type).toEqual('9999');
                expect(user.smiles).toEqual(99);
                expect(user.password).toBeUndefined();
            }

            _UserService
                .login(_userInstance)
                .then(_onSuccess);
        })
    })

    describe('createUser', function()
    {
        it('should reject the promise with an error, user is invalid', function()
        {
            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).match(/Usuário não é válido. Não é possível cadastrá-lo./);
            }

            _UserService
                .createUser(_userInstance)
                .then(null, _onError);
        })

        it('should reject the promise, server returns error', function()
        {
            var _validUser = new _User({username: 'a', language: 'EN', type: "1"});

            _httpMock.expectPOST(_userAPI, _validUser).respond(500, {message: 'erro'});

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(typeof error).toEqual('object');
            }

            _UserService
                .createUser(_userInstance)
                .then(null, _onError);
        })

        it('should resolve the promise correctly', function()
        {
            var _validUser = new _User({username: 'a', language: 'EN', type: 1});

            _httpMock.expectPOST(_userAPI, _validUser).respond({username: 'eric', language: 'EN', type: "9999", smiles: 123});

            var _onSuccess = function(user)
            {
                expect(user).toBeDefined();
                expect(user.username).toEqual('eric');
                expect(user.language).toEqual('EN');
                expect(user.type).toEqual("9999");
                expect(user.smiles).toEqual(123);
            }

            _UserService
                .createUser(_userInstance)
                .then(_onSuccess);
        })
    })
})