"use strict";

describe('HomeController', function()
{
    var _scope, _httpMock, _PostService, _SocketService;
    var CONTROLLER_NAME = 'HomeController as home';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _PostService = $injector.get('PostService');
        _SocketService = $injector.get('SocketService');
    }))

    describe('getAllPosts', function()
    {
        it('should call the getAllPosts from the PostService', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/post').respond([{title: 'a', imageUrl: 'abc.jpg'}]);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(_scope.home.posts[0].title).toEqual('a');
            expect(_scope.home.posts[0].imageUrl).toEqual('abc.jpg');
        }))
    })

    describe('smileAtPost', function()
    {
        it('should NOT call the Socket method, id invalid', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.home.smileAtPost(null);

            expect(_SocketService.emit).not.toHaveBeenCalled();
        }))

        it('should call the Socket method correctly', inject(function($controller)
        {
            spyOn(_SocketService, 'emit').andCallFake(angular.noop);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            var _id = 'abc123';

            _scope.home.smileAtPost(_id);

            expect(_SocketService.emit).toHaveBeenCalledWith('post:smile', _id);
        }))
    })
})