"use strict";

var Authentication = require('../../../server/services/Authentication');
var User = require('../../../server/models/User');
var helper = require('../helper/helper');
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');

describe('Authentication', function()
{
    chai.use(spies);

    describe('authenticate', function()
    {
        it('should reject the user, not found in the base', function()
        {
            var _resMocked = {cookie: function(){}};
            var _token = '123';

            var _spy = chai.spy(_resMocked.cookie);

            Authentication.authenticate(_resMocked, _token);

            expect(_spy).to.have.been.called();
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