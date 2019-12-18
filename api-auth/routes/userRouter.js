const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helper/routerHelpers');
const UserController = require('../controller/userController');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin')
    .post(validateBody(schemas.signinSchema), passportSignIn, UserController.signIn);

router.route('/oauth/facebook')
    .post(passportFacebook, UserController.facebookOauth);

router.route('/secret')
    .get(passportJWT, UserController.secret);

// return to google signin page
router.route('/auth/google')
    .get(passport.authenticate("googleToken", {
        scope: ['profile', 'email']
    }));

router.route('/auth/google/callback')
    .get(passport.authenticate("googleToken", { session: true }), UserController.googleOAuth);

router.route('/get-user-google')
    .post(UserController.getUserByGoogleCallback);

module.exports = router;