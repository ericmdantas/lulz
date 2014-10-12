"use strict";

describe('emd-to-the-top-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<to-the-top></to-the-top>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('click', function()
    {
        it('should react on click', function()
        {
            _element.click();
        })
    })
})