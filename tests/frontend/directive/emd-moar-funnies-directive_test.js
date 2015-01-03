"use strict";

describe('emd-moar-funnies', function()
{
    var _scope, _compile, _element;

    beforeEach(module('lulz'));
    beforeEach(module('my.includes'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
    }))

    describe('creation', function()
    {
        it('should have element created and accessible', function()
        {
            var _html = '<emd-moar-funnies></emd-moar-funnies>';

            _element = angular.element(_html);

            _compile(_element)(_scope);

            _scope.$digest();

            expect(_element).toBeDefined();
            expect(_element.isolateScope).toBeDefined();
        })
    })

    describe('onClick', function()
    {
        it('should react to clicking event', function()
        {
            var called = false;

            _scope.test = function(){called = true;};

            var _html = '<emd-moar-funnies load-more="test()"></emd-moar-funnies>';

            _element = angular.element(_html);
            _compile(_element)(_scope);
            _scope.$digest();

            _element.click();

            expect(called).toBeTruthy();
        })
    })
})