"use strict";

describe('PostController', function()
{
    var _scope, _httpMock, _PostService, _Post;
    var CONTROLLER_NAME = 'PostController as post';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');

        _Post = $injector.get('Post');
        _PostService = $injector.get('PostService');
    }))

    describe('instance', function()
    {
        it('should instanctiate correctly Post', inject(function($controller)
        {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_scope.post.post).toBeDefined();
            expect(_scope.post.post instanceof _Post).toBeTruthy();
        }))
    })

    describe('createPost', function()
    {
        it('should NOT create the post - object is not a valid post', inject(function($controller)
        {
            var _post = {title: 'Aa', imageUrl: 'Aa', language: 'EN'};

            _httpMock.expectPOST('/api/protected/post', _post).respond(200);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            spyOn(_PostService, 'createPost').andCallFake(function(){return {then: angular.noop}});

            _scope.post.createPost(_post);

            expect(_PostService.createPost).toHaveBeenCalledWith(_post);

            expect(_scope.post.post instanceof _Post).toBeTruthy();
            expect(_scope.post.post.title).toBeNull();
            expect(_scope.post.post.imageUrl).toBeNull();

            //_httpMock.flush();
        }))

        it('should create the post successfully', inject(function($controller)
        {
            var _post = {title: 'Aa', imageUrl: 'Aa.jpg', language: 'EN'};

            _httpMock.expectPOST('/api/protected/post', _post).respond(200);
            $controller(CONTROLLER_NAME, {$scope: _scope});

            spyOn(_PostService, 'createPost').andCallThrough();

            _scope.post.createPost(_post);

            _scope.$digest();

            expect(_PostService.createPost).toHaveBeenCalledWith(_post);
        }))
    })
})