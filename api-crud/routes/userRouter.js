const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helper/routerHelpers');
const UserController = require('../controller/userController');

const passportJWT = passport.authenticate('jwt', { session: false });

// == route crud user data == //
router.route('/get-user-data')
    .get(passportJWT, UserController.getUserData);

router.route('/delete-user-data')
    .post(passportJWT, UserController.deleteUserData);

router.route('/add-user-data')
    .post(passportJWT, UserController.addUserData);

router.route('/get-one-user-data/:id')
    .get(passportJWT, UserController.getDataUser);

router.route('/update-user-data')
    .post(passportJWT, UserController.updateUserData);

router.route('/update-pass-user-data')
    .post(passportJWT, validateBody(schemas.upPassSchema), UserController.updatePassUserData);

module.exports = router;