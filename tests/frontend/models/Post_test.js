"use strict";

describe('Post', function()
{
    var _Post;
    var _postInstance;

    beforeEach(module('lulz'));

    beforeEach(inject(function($injector)
    {
        _Post = $injector.get('Post');
        _postInstance = _Post.new();
    }))

    describe('creation', function()
    {
        it('should have the right instance', function()
        {
            expect(_postInstance instanceof _Post).toBeTruthy();
        })

        it('should have the right default props', function()
        {
            expect(_postInstance._id).toBeNull();
            expect(_postInstance.title).toBeNull();
            expect(_postInstance.imageUrl).toBeNull();
            expect(_postInstance.comments).toBeNull();
            expect(_postInstance.smiles).toBe(0);
            expect(_postInstance.author).toBeNull();
            expect(_postInstance.language).toBe('EN');
        })
    })

    describe('isNew', function()
    {
        it('should return true', function()
        {
            expect(_postInstance.isNew()).toBeTruthy();
        })

        it('should return false', function()
        {
            _postInstance._id = 'a123';

            expect(_postInstance.isNew()).toBeFalsy();
        })
    })

    describe('isInvalid', function()
    {
        it('should return true, object is not valid - empty', function()
        {
            expect(_postInstance.isInvalid()).toBeTruthy();
        })

        it('should return true, object is not valid - all pros invalid', function()
        {
            var _invalidProps = helper.invalidStrings();

            for (var i = 0; i < _invalidProps.length; i++)
            {
                for (var j in _postInstance)
                {
                    if ("function" !== typeof _postInstance[j])
                    {
                        _postInstance[j] = _invalidProps[i];

                        expect(_postInstance.isInvalid()).toBeTruthy();
                    }
                }
            }
        })

        it('should return false, object is valid', function()
        {
            _postInstance.title = 'A';
            _postInstance.imageUrl = 'abc.jpg';
            _postInstance.language = 'JP';
            _postInstance.author = 'eu';

            expect(_postInstance.isInvalid()).toBeFalsy();
        })
    })
})