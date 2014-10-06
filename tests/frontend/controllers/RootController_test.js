"use strict";

describe('RootController', function()
{
    var _scope;
    var CONTROLLER_NAME = 'RootController as rootCtrl';

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
    }))

    describe('first', function()
    {
        it('s', function()
        {
            expect(true).toBeTruthy();
        })
    })
})