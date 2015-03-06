"use strict";

var Auth = require('../services/Authentication');
var contentController = require('../controllers/ContentController');
var userController = require('../controllers/UserController');
var postController = require('../controllers/PostController');

const BASE_PROTECTED_API = '/api/protected/';


var _init = function(router, app)
{
    // MAIN PAGE

    router
        .route('/')
        .get(contentController.sendMainPage);


    // USER RELATED

    router
        .route(BASE_PROTECTED_API + 'user/login')
        .post(userController.lookForUser)

    router
        .route(BASE_PROTECTED_API + 'user')
        .post(userController.createUser);


    // POST RELATED

    router
        .route(BASE_PROTECTED_API + 'post')
        .get(postController.getAll)
        .post(Auth.isLoggedIn, postController.createPost);

    router
        .route(BASE_PROTECTED_API + 'post/:id')
        .get(postController.getById);


    // URL NOT FOUND

    router
        .route('*')
        .get(contentController.sendMainPage);

    app.use('/', router);
}

exports.init = _init;