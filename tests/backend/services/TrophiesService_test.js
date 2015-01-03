"use strict";

var User = require('../../../server/models/User');
var Post = require('../../../server/models/Post');
var helper = require('../helper/helper');
var expect = require('chai').expect;
var TrophiesService = require('../../../server/services/TrophiesService');

describe('TrophiesService', function()
{
    describe('getTrophies', function()
    {
        beforeEach(function(done)
        {
            helper
                .createUser()
                .then(function()
                {
                    return helper.createPost();
                })
                .then(function()
                {
                    done();
                });
        })

        afterEach(function(done)
        {
            User.remove();
            Post.remove(done);
        })

        it('should return the correct info for the object', function(done)
        {
            var _onSuccess = function(userWithTrophies)
            {
                expect(userWithTrophies).to.be.defined;

                done();
            }

            var _onError = function(error)
            {
                expect(error).to.be.undefined;
            }

            TrophiesService
                .getTrophies()
                .then(_onSuccess, _onError);
        })
    })
})