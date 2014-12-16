"use strict";

describe('emd-options-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('lulz'));
    beforeEach(module('my.includes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<emd-options></emd-options>';

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

        it('should have scope.options set correclty', function()
        {
            expect(_element.isolateScope().options).toBeDefined();
            expect(_element.isolateScope().options.length).toBeGreaterThan(2);
        })
    })
})