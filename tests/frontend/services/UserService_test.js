"use strict";

describe('UserService', function()
{
    var _rootScope,
        _UserService,
        _User,
        _userInstance,
        _httpMock,
        _API,
        _userAPI,
        _userAPILogin,
        _xtorage;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _rootScope = $injector.get('$rootScope').$new();
        _UserService = $injector.get('UserService');
        _User = $injector.get('User');
        _userInstance = _User.new();
        _xtorage = $injector.get('$xtorage');
        _httpMock = $injector.get('$httpBackend');
        _API = $injector.get('BASE_PROTECTED_API');
        _userAPI = _API + 'user';
        _userAPILogin = _API + 'user/login';
    }))

    describe('login', function()
    {
        it('should reject with an error, user is invalid', function()
        {
            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toMatch(/Usuário informado não é válido. Não é possível fazer login./);
            }

            _UserService
                .login(_userInstance)
                .then(null, _onError);

            _rootScope.$digest();
        })

        it('should make the request correctly, server returns error', function()
        {
            _userInstance.username = 'eric';
            _userInstance.password = 'a123';

            _httpMock.expectPOST(_userAPILogin, _userInstance).respond(500, {message: 'erro'});

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _UserService
                .login(_userInstance)
                .then(null, _onError);

            _httpMock.flush();
        })

        it('should make the request correctly', function()
        {
            spyOn(_xtorage, 'save').andCallFake(angular.noop);

            var _response = {_id: 'a123', username: 'eric', type: "9999", smiles: 99};

            _userInstance.username = 'eric';
            _userInstance.password = 'a123';

            _httpMock.expectPOST(_userAPILogin, _userInstance).respond(_response);

            var _onSuccess = function(user)
            {
                expect(user).toBeDefined();
                expect(user._id).toEqual('a123');
                expect(user.username).toEqual('eric');
                expect(user.type).toEqual('9999');
                expect(user.smiles).toEqual(99);
                expect(user.password).toBeUndefined();
                //expect(user.$promise).toBeUndefined();
            }

            _UserService
                .login(_userInstance)
                .then(_onSuccess);

            _httpMock.flush();

            expect(_xtorage.save).toHaveBeenCalled();
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
                expect(error).toMatch(/Usuário não é válido. Não é possível cadastrá-lo./);
            }

            _UserService
                .createUser(_userInstance)
                .then(null, _onError);

            _rootScope.$digest();
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
                .createUser(_validUser)
                .then(null, _onError);

            _httpMock.flush();
        })

        it('should resolve the promise correctly', function()
        {
            var _validUser = new _User({username: 'a', language: 'EN', type: "1"});

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
                .createUser(_validUser)
                .then(_onSuccess);

            _httpMock.flush();
        })
    })
})