"use strict";

describe('User', function()
{
    var _User;
    var _userInstance;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _User = $injector.get('User');
        _userInstance = _User.new();
    }))

    describe('creation', function()
    {
        it('should have the right instance', function()
        {
            expect(_userInstance instanceof _User).toBeTruthy();
        })

        it('should have the right default props', function()
        {
            expect(_userInstance._id).toBeNull();
            expect(_userInstance.username).toBeNull();
            expect(_userInstance.password).toBeNull();
            expect(_userInstance.type).toBe("1");
            expect(_userInstance.smiles).toBe(0);
            expect(_userInstance.posts.length).toEqual(0);
            expect(_userInstance.comments.length).toEqual(0);
            expect(_userInstance.language).toBe('EN');
        })
    })

    describe('isNew', function()
    {
        it('should return true', function()
        {
            expect(_userInstance.isNew()).toBeTruthy();
        })

        it('should return false', function()
        {
            _userInstance._id = 'a123';

            expect(_userInstance.isNew()).toBeFalsy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true, object is not valid - empty', function()
        {
            expect(_userInstance.isInvalid()).toBeTruthy();
        })

        it('should return true, object is not valid - all pros invalid', function()
        {
            var _invalidProps = helper.invalidStrings();

            for (var i = 0; i < _invalidProps.length; i++)
            {
                for (var j in _userInstance)
                {
                    if ("function" !== typeof _userInstance[j])
                    {
                        _userInstance[j] = _invalidProps[i];

                        expect(_userInstance.isInvalid()).toBeTruthy();
                    }
                }
            }
        })

        it('should return false, object is valid', function()
        {
            _userInstance.username = 'A';
            _userInstance.language = 'PT-BR';
            _userInstance.type = "1";

            expect(_userInstance.isInvalid()).toBeFalsy();
        })
    })
})