"use strict";

describe('MainController', function()
{
    var _scope, _httpMock, _PostService;
    var CONTROLLER_NAME = 'MainController as main';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _PostService = $injector.get('PostService');
    }))

    describe('getAllPosts', function()
    {
        it('should call the getAllPosts from the PostService', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/post').respond([{title: 'a', imageUrl: 'abc.jpg'}]);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(_scope.main.posts[0].title).toEqual('a');
            expect(_scope.main.posts[0].imageUrl).toEqual('abc.jpg');
        }))
    })
})