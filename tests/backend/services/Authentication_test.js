"use strict";

var Authentication = require('../../../server/services/Authentication');
var User = require('../../../server/dal/UserDAO');
var helper = require('../helper/helper');
var expect = require('chai').expect;

describe('Authentication', function()
{
    describe('authenticate', function()
    {
        it('should reject the user, not found in the base', function()
        {
            var _called = false;

            var _resMocked =
            {
                cookie: function()
                {
                    _called = true;

                    expect(arguments[0]).to.equal('token');
                    expect(arguments[1]).to.equal(_token);
                    expect(arguments[2].httpOnly).to.be.true;
                }
            };

            var _token = '123';

            Authentication.authenticate(_resMocked, _token);

            expect(_called).to.be.true;
        })
    })

    describe('isLoggedIn', function()
    {
        beforeEach(function(done)
        {
            helper
                .createUser()
                .then(function()
                {
                    done();
                })
        })

        afterEach(function(done)
        {
            User.remove(done);
        })
    })
})