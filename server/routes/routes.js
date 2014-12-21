"use strict";

(function(Auth, contentController, userController, postController, trophiesController)
{
    var BASE_PROTECTED_API = '/api/protected/';

    var _init = function(router, app)
    {
        // MAIN PAGE

        router
            .route('/')
            .get(contentController.sendMainPage);


        // USER RELATED

        router
            .route(BASE_PROTECTED_API + 'user')
            .get(userController.lookForUser)
            .post(userController.createUser);


        // POST RELATED

        router
            .route(BASE_PROTECTED_API + 'post')
            .get(postController.getAll)
            .post(Auth.isLoggedIn, postController.createPost);

        router
            .route(BASE_PROTECTED_API + 'post/:id')
            .get(postController.getById);


        // TROPHIES RELATED

        router
            .route('/api/trophies')
            .get(trophiesController.getAll);


        // URL NOT FOUND

        router
            .route('*')
            .get(contentController.sendMainPage);

        app.use('/', router);
    }

    exports.init = _init;

}(require('../services/Authentication'),
  require('../controllers/ContentController'),
  require('../controllers/UserController'),
  require('../controllers/PostController'),
  require('../controllers/TrophiesController')))