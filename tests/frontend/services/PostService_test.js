"use strict";

describe('PostService', function()
{
    var _PostService, _httpMock;
    var POST_URL = '/api/protected/post';
    var GET_ALL_URL = '/api/protected/post';
    var GET_BY_ID_URL = '/api/protected/post/';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _PostService = $injector.get('PostService');
        _httpMock = $injector.get('$httpBackend');
    }))

    describe('getAll', function()
    {
        it('should make the request, server returns error', function()
        {
            _httpMock.expectGET(GET_ALL_URL).respond(500, {message: 'deu ruim'});

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.message).toEqual('deu ruim');
            }

            _PostService
                .getAll()
                .then(null, _onError);
        })

        it('should make the request correctly', function()
        {
            var _response = [{title: 'a', description: 'b', imageUrl: 'a.jpg'}, {title: 'a', description: 'b', imageUrl: 'a.jpg'}];

            _httpMock.expectGET(GET_ALL_URL).respond(_response);

            var _onSuccess = function(posts)
            {
                expect(posts.length).toEqual(2);
            }

            _PostService
                .getAll()
                .then(_onSuccess);
        })
    })

    describe('getById', function()
    {
        it('should reject with an error, invalid id', function()
        {
            var _invalidIds = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error instanceof Error).toBeTruthy();
                expect(error).match(/.+ id inválido/);
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _PostService
                    .getById(_invalidIds[i])
                    .then(null, _onError);
            }
        })

        it('should make the request correctly', function()
        {
            var _response = {title: 'a', imageUrl: 'a.jpg', description: 'alo', _id: 'a123'};
            var _id = 'a123';

            _httpMock.expectGET(GET_BY_ID_URL + _id).respond(_response);

            var _onSuccess = function(post)
            {
                expect(post).toEqual(_response);
            }

            _PostService
                .getById(_id)
                .then(_onSuccess);
        })
    })

    describe('createPost', function()
    {

    })
})