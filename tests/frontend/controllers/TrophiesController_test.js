"use strict";

describe('TrophiesController', function()
{
    var _scope, _httpMock, TrophiesService;
    var CONTROLLER_NAME = 'TrophiesController as trophy';
    var GET_ALL = '/api/trophies';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');

        TrophiesService = $injector.get('TrophiesService');
    }))

    describe('getTop', function()
    {
        it('should call the right method from the service', inject(function($controller)
        {
            spyOn(TrophiesService, 'getTop').andCallFake(function(){return {then: angular.noop}});

            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(TrophiesService.getTop).toHaveBeenCalled();
        }))

        it('should receive the error from the service - 403', inject(function($controller)
        {
            _httpMock.expectGET(GET_ALL).respond(500, {error: 'error'});

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(angular.equals(_scope.trophy.trophies, [])).toBeTruthy();
        }))

        it('should fill the  the right method from the service - empty array', inject(function($controller)
        {
            _httpMock.expectGET(GET_ALL).respond([]);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(angular.equals(_scope.trophy.trophies, [])).toBeTruthy();
        }))

        it('should fill the  the right method from the service - full array', inject(function($controller)
        {
            var _response = [{username: 'eric', createdAt: new Date(), type: "9999", smiles: 999},
                             {username: 'lucas', createdAt: new Date(), type: "9999", smiles: 999}];

            _httpMock.expectGET(GET_ALL).respond(_response);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpMock.flush();

            expect(angular.equals(_scope.trophy.trophies[0], _response[0])).toBeTruthy();
            expect(angular.equals(_scope.trophy.trophies[1], _response[1])).toBeTruthy();
        }))
    })
})