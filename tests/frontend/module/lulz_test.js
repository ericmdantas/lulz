"use strict";

describe('lulz', function()
{
    var _scope, _OPTIONS, _POST_LIMIT, _BASE_PROTECTED_API;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _OPTIONS = $injector.get('OPTIONS');
        _POST_LIMIT = $injector.get('POST_LIMIT');
        _BASE_PROTECTED_API = $injector.get('BASE_PROTECTED_API');
    }))

    describe('OPTIONS', function()
    {
        it('should have OPTIONS constant created', function()
        {
            expect(_OPTIONS).toBeDefined();
        })

        it('should be populated correctly', function()
        {
            expect(_OPTIONS.length).toBeGreaterThan(2);

            for (var i in _OPTIONS)
            {
                expect(typeof _OPTIONS[i]).toBe('object');
                expect(typeof _OPTIONS[i].icon).toBe('string');
                expect(typeof _OPTIONS[i].location).toBe('string');
            }
        })
    })

    describe('POST_LIMIT', function()
    {
        it('should have the right value to POST_LIMIT', function()
        {
            expect(_POST_LIMIT).toBeDefined();
            expect(_POST_LIMIT).toEqual(100);
        })
    })

    describe('BASE_PROTECTED_API', function()
    {
        it('should have the right value for the api', function()
        {
            expect(_BASE_PROTECTED_API).toEqual('/api/protected/');
        })
    })
})