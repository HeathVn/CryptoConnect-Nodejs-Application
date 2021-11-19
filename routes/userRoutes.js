const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();



//get the sign up form
router.get('/new', controller.new);


//create a new user
router.post('/',controller.createUser);

//get login form
router.get('/login', controller.login);


//process login request
router.post('/login', controller.processLogin);




router.get('/profile', controller.profile);

router.get('/logout', controller.logout);




module.exports = router;