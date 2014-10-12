"use strict";

var _validator = require('../../../services/ValidatorService');
var expect = require('chai').expect;
var helper = require('../helper/helper');

describe('ValidatorService', function()
{
    describe('isStringInvalid', function()
    {
        it('should return true - string is valid', function()
        {
            var _invalidStrings = helper.invalidStrings();

            for (var i = 0; i < _invalidStrings.length; i++)
            {
                expect(_validator.isStringInvalid(_invalidStrings[i])).to.be.true;;
            }
        })

        it('should return false - string is valid', function()
        {
            var _validString = 'a';
            expect(_validator.isStringInvalid(_validString)).to.be.false;;
        })
    })

    describe('isNumberInvalid', function()
    {
        it('should return true, number is invalid', function()
        {
            var _invalid = helper.invalidNumbers();

            for (var i = 0; i < _invalid.length; i++)
            {
                expect(_validator.isNumberInvalid(_invalid[i])).to.be.true;;
            }
        })

        it('should return false, number is valid', function()
        {
            var _num = 0;

            expect(_validator.isNumberInvalid(_num)).to.be.false;;

            _num = 1;

            expect(_validator.isNumberInvalid(_num)).to.be.false;;
        })
    })

    describe('isObjectInvalid', function()
    {
        it('should return true, object is invalid', function()
        {
            var _invalidObjects = helper.invalidObjects();

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                expect(_validator.isObjectInvalid(_invalidObjects[i])).to.be.true;;
            }
        })

        it('should return false, object is valid', function()
        {
            var _obj = {a: 1};

            expect(_validator.isObjectInvalid(_obj)).to.be.false;;
        })
    })
})