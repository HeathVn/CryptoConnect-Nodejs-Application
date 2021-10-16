const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//Get index page
router.get('/', controller.index);

//Get about page
router.get('/about', controller.about);

//Get contact page
router.get('/contact', controller.contact);




module.exports = router;
