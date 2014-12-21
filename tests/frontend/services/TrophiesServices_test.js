"use strict";

describe('TrophiesService', function()
{
    var _httpMock, TrophiesService;
    var CONTROLLER_NAME = '/api/trophies';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');

        TrophiesService = $injector.get('TrophiesService');
    }))

    describe('getTop', function()
    {
        it('should return error object - server returns error', function()
        {
            _httpMock.expectGET(CONTROLLER_NAME).respond(500, {error: 'error'});

            var _onSuccess = function()
            {
                expect(true).toBeFalsy(); // should not come here
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.status).toBe(500);
                expect(error.error).toBe('error');
            }

            TrophiesService
                .getTop()
                .then(_onSuccess, _onError);
        })

        it('should the right array', function()
        {
            var _response = [{username: 'eric', createdAt: new Date(), type: "9999", smiles: 999},
                             {username: 'lucas', createdAt: new Date(), type: "9999", smiles: 999}];

            _httpMock.expectGET(CONTROLLER_NAME).respond(_response);

            var _onSuccess = function(trophies)
            {
                expect(trophies).toBeDefined();

                for (var i in _response)
                {
                    expect(angular.equals(trophies[i], _response[i])).toBeTruthy();
                }
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy(); // should not come here
            }

            TrophiesService
                .getTop()
                .then(_onSuccess, _onError);
        })
    })
})