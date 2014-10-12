"use strict";

describe('MainController', function()
{
    var _scope, _httpMock, _UserService, _User;
    var CONTROLLER_NAME = 'UserController as user';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');

        _User = $injector.get('User');
        _UserService = $injector.get('UserService');
    }))

    describe('creation', function()
    {
        it('should have the right instance to user', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_scope.user.user instanceof _User).toBeTruthy();
        }))
    })

    describe('login', function()
    {
        it('should call the UserService.login correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/user?username=a&password=b').respond(200);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _user = {username: 'a', password: 'b'};

            spyOn(_UserService, 'login').andCallThrough();

            _scope.user.login(_user);

            expect(_UserService.login).toHaveBeenCalledWith(_user);
        }))
    })

    describe('createUser', function()
    {
        it('should call the UserService.createUser correctly', inject(function($controller)
        {
            var _user = {username: 'a', password: 'b'};

            _httpMock.expectGET('/api/protected/user', _user).respond(200);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            spyOn(_UserService, 'createUser').andCallThrough();

            _scope.user.save(_user);

            expect(_UserService.createUser).toHaveBeenCalledWith(_user);
        }))
    })
})