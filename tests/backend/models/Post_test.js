"use strict";

var expect = require('chai').expect;
var helper = require('../helper/helper');
var _Post = require('../../../models/Post');

describe('Post', function()
{
    var _postInstance;

    before(helper.configMongoose);

    beforeEach(function()
    {
        _postInstance = new _Post();
    })

    describe('getAll', function()
    {
        beforeEach(function(done)
        {
            helper
                .createPost()
                .then(function()
                {
                    done();
                })
        })

        afterEach(function(done)
        {
            _Post.remove(done);
        })

        it('should get all posts correctly', function(done)
        {
            var _onSuccess = function(posts)
            {
                expect(posts).to.have.length.above(4);
                done();
            }

            _postInstance
                .getAll()
                .then(_onSuccess);
        })
    })

    describe('getById', function()
    {
        beforeEach(function(done)
        {
            helper
                .createPost()
                .then(function()
                {
                    done();
                })
        })

        afterEach(function(done)
        {
            _Post.remove(done);
        })

        it('should reject with an error - id is invalid', function(done)
        {
            var _invalidIds = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível buscar pelo post, id inválido./);
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _postInstance
                    .getById(_invalidIds[i])
                    .then(null, _onError);
            }

            done();
        })

        it('should get the post correctly', function(done)
        {
            var _id = '507f191e810c19729de860ea';

            var _onSuccess = function(post)
            {
                expect(post).to.be.defined;
                expect(post).to.be.an.instanceof(_Post);
                expect(post.title).to.be.defined;
                expect(post.description).to.be.defined;
                expect(post.smiles).to.be.defined;
                expect(post.imageUrl).to.exist;

                done();
            }

            _postInstance
                .getById(_id)
                .then(_onSuccess);
        })
    })

    describe('createPost', function()
    {
        beforeEach(function(done)
        {
            helper
                .createPost()
                .then(function()
                {
                    done();
                })
        })

        afterEach(function(done)
        {
            _Post.remove(done);
        })

        it('should not create post - title missing', function()
        {
            var _post = {title: null, imageUrl: 'b0.jpg', description: "aehO0", author: '507f191e810c19729de860ea'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.postname.message).to.match(/title .+ required/);
                done();
            }

            new _Post()
                .createPost(_post)
                .then(_onSuccess, _onError);
        })

        it('should not create post - imageUrl missing', function()
        {
            var _post = {title: 'titulo', imageUrl: null, description: "aehO0", author: '507f191e810c19729de860ea'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.postname.message).to.match(/imageUrl .+ required/);
                done();
            }

            new _Post()
                .createPost(_post)
                .then(_onSuccess, _onError);
        })

        it('should not create post - author missing', function()
        {
            var _post = {title: 'a', imageUrl: 'b0.jpg', description: "aehO0", author: null};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                expect(error.errors.postname.message).to.match(/author .+ required/);
                done();
            }

            new _Post()
                .createPost(_post)
                .then(_onSuccess, _onError);
        })

        it('should create post correctly', function()
        {
            var _post = {title: 'titulo', imageUrl: 'b0.jpg', description: "aehO0", author: '507f191e810c19729de860ea'};

            var _onSuccess = function()
            {
                expect(true).to.be.true;

                done();
            }

            var _onError = function()
            {
                expect(false).to.be.true;
            }

            new _Post()
                .createPost(_post)
                .then(_onSuccess, _onError);
        })
    })
})