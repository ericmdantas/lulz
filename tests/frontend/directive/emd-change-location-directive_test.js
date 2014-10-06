"use strict";

describe('emd-change-location-directive', function()
{
    var _scope, _element, _compile, _locationMock;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _locationMock = $injector.get('$location');
    }))

    describe('nothing set', function()
    {
        it('should have element created', function()
        {
            var _html = '<div emd-change-location-to></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            _element.click();

            expect(_locationMock.path()).toEqual('/');
        })
    })

    describe('should set to the chosen url', function()
    {
        it('should have element created', function()
        {
            var _html = '<div emd-change-location-to="/abc"></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            _element.click();

            expect(_locationMock.path()).toEqual('/abc');
        })

        it('should have element created - complex location', function()
        {
            var _html = '<div emd-change-location-to="/abc/1/def/2"></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            _element.click();

            expect(_locationMock.path()).toEqual('/abc/1/def/2');
        })
    })
})