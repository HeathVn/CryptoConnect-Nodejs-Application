const express = require('express');
const {body}= require('express-validator');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {loginLimiter} = require('../middlewares/rateLimiters');
const {validateSignUp, validateLogIn, validateResult} = require('../middlewares/validator');

const router = express.Router();



//get the sign up form
router.get('/new', isGuest,controller.new);


//create a new user
router.post('/',isGuest,validateSignUp, validateResult,controller.createUser);

//get login form
router.get('/login', isGuest,controller.login);


//process login request
router.post('/login',loginLimiter,isGuest,validateLogIn,validateResult,controller.processLogin);




router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);




module.exports = router;