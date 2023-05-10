const express = require('express');
const router = express.Router();
const passport = require('passport')

const usersController = require('../controllers/users_controller');

router.get('/sign-in',usersController.signIn)

router.get('/sign-up',usersController.signUp)

router.post('/create',usersController.create)

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.create_session)

router.get('/sign-out',usersController.destroySession)

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.create_session);

router.get('/profile',usersController.profile)

router.post('/profile/update/:id',usersController.updateProfile)

module.exports = router;