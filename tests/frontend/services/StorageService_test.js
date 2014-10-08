"use strict";

describe('StorageService', function()
{
    var _StorageService;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _StorageService = $injector.get('StorageService');
    }))

    afterEach(function()
    {
        localStorage.clear();
    })

    describe('get', function()
    {
        it('should get the info correctly from the localStorage', function()
        {
            localStorage.setItem('a', JSON.stringify({z: 99}));

            expect(_StorageService.get('a').z).toEqual(99);
        })
    })

    describe('save', function()
    {
        it('should save the item correctly', function()
        {
            _StorageService.save('k', {key: 'secret'});

            expect(_StorageService.get('k')).toBeDefined();
            expect(_StorageService.get('k').key).toEqual('secret');
        })
    })

    describe('remove', function()
    {
        it('should remove the item correctly', function()
        {
            expect(_StorageService.get('k')).toBeNull();

            _StorageService.save('k', JSON.stringify({alo: 'alo'}));

            expect(_StorageService.get('k')).toBeDefined();

            _StorageService.remove('k');

            expect(_StorageService.get('k')).toBeNull();
        })
    })
})