"use strict";

var expect = require('chai').expect;
var helper = require('../helper/helper');
var _Post = require('../../../server/dal/PostDAO');
var _User = require('../../../server/dal/UserDAO');

describe('Post', function()
{
    before(helper.configMongoose);

    beforeEach(function(done)
    {
        _Post.remove();
        _User.remove(done);
    });

    describe('getAll', function()
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
                }, function(e){console.log(e);});
        })

        afterEach(function(done)
        {
            _Post.remove(done);
        });

        it('should get all posts correctly', function(done)
        {
            var _onSuccess = function(posts)
            {
                expect(posts).to.have.length.above(4);

                posts.forEach(function(post)
                {
                    expect(post).to.have.property('author').and.to.be.an('object');
                    expect(post.author).to.have.property('username');
                })

                done();
            }

            _Post
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
                expect(error.message).to.match(/Não é possível buscar pelo post, id inválido./);
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _Post
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

            _Post
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

        it('should not create post - title missing', function(done)
        {
            var _post = {title: null, imageUrl: 'b0.jpg', description: "aehO0", author: '507f191e810c19729de860ea'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                done();
            }

            _Post
                .createPost(_post)
                .then(_onSuccess, _onError);
        })

        it('should not create post - imageUrl missing', function(done)
        {
            var _post = {title: 'titulo', imageUrl: null, description: "aehO0", author: '507f191e810c19729de860ea'};

            var _onSuccess = function()
            {
                expect(false).to.be.true;
            }

            var _onError = function(error)
            {
                expect(error).to.an.instanceof(Error);
                done();
            }

            _Post
                .createPost(_post)
                .then(_onSuccess, _onError);
        })

        it('should create post correctly', function(done)
        {
            var _post = {title: 'titulo', imageUrl: 'b0.jpg', description: "aehO0", author: '507f191e810c19729de860ea'};

            var _onSuccess = function(post)
            {
                expect(post).to.be.defined;
                expect(post).to.be.an.instanceof(_Post);

                done();
            }

            var _onError = function()
            {
                expect(false).to.be.true;
            }

            _Post
                .createPost(_post)
                .then(_onSuccess, _onError);
        })
    })

    describe('likePost', function()
    {
        beforeEach(function(done)
        {
            helper
                .createPost()
                .then(function()
                {
                    done();
                });
        })

        afterEach(function(done)
        {
            _Post.remove(done);
        })

        it('should reject with error id is not valid', function(done)
        {
            var _ids = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).to.be.defined;
                expect(error).to.be.an.instanceof(Error);
                expect(error).to.match(/Não é possível curtir o post em questão, id inválido./);
            }

            for (var i = 0; i < _ids.length; i++)
            {
                _Post
                    .likePost(_ids[i])
                    .then(null, _onError);
            }

            done();
        })

        it('should like the post correctly', function(done)
        {
            var _id = '507f191e810c19729de860ec';

            var _onSuccess = function(post)
            {
                expect(post).to.be.defined;
                expect(post).to.have.property('_id').and.to.be.defined;
                expect(post).to.have.property('smiles').and.to.be.equal(1);

                expect(post).to.not.have.property('title');
                expect(post).to.not.have.property('username');

                done();
            }

            _Post
                .likePost(_id)
                .then(_onSuccess);
        })
    })
})