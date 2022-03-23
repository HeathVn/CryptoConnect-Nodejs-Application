const express = require('express');
const controller = require('../controllers/rsvpController');
const {isGuest, isLoggedIn,isAuthor2} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();



//POST /connections: create a new story
router.post('/', isLoggedIn ,controller.create);


//PUT /rsvps/:id: update the story identified by id
router.put('/:id',isLoggedIn,isAuthor2, controller.update);

//DELETE /rsvps/:id, delete the story identified by id

router.delete('/:id',isLoggedIn,controller.delete);


module.exports = router;