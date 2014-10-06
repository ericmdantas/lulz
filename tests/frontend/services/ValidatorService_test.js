"use strict";

describe('ValidatorService', function()
{
    describe('isStringInvalid', function()
    {
        it('should return true - string is valid', function()
        {
            var _invalidStrings = helper.invalidStrings();

            for (var i = 0; i < _invalidStrings.length; i++)
            {
                expect(validator.isStringInvalid(_invalidStrings[i])).toBeTruthy();
            }
        })

        it('should return false - string is valid', function()
        {
            var _validString = 'a';
            expect(validator.isStringInvalid(_validString)).toBeFalsy();
        })
    })

    describe('isNumberInvalid', function()
    {
        it('should return true, number is invalid', function()
        {
            var _invalid = helper.invalidNumbers();

            for (var i = 0; i < _invalid.length; i++)
            {
                expect(validator.isNumberInvalid(_invalid[i])).toBeTruthy();
            }
        })

        it('should return false, number is valid', function()
        {
            var _num = 0;

            expect(validator.isNumberInvalid(_num)).toBeFalsy();

            _num = 1;

            expect(validator.isNumberInvalid(_num)).toBeFalsy();
        })
    })

    describe('isObjectInvalid', function()
    {
        it('should return true, object is invalid', function()
        {
            var _invalidObjects = helper.invalidObjects();

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                expect(validator.isObjectInvalid(_invalidObjects[i])).toBeTruthy();
            }
        })

        it('should return false, object is valid', function()
        {
            var _obj = {a: 1};

            expect(validator.isObjectInvalid(_obj)).toBeFalsy();
        })
    })
})