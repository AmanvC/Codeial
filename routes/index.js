const express = require('express');
const router = express.Router();

const passport = require('passport');

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.post('/create-user', homeController.createUser);
router.get('/login', homeController.login);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/login'}
), homeController.createSession);

router.get('/home', passport.checkAuthentication, homeController.userHome);
router.get('/destroy-session', passport.checkAuthentication, homeController.destroySession);
module.exports = router;