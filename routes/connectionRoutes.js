const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId, validateConnectionCreation, validateConnectionUpdate, validateResult, validateTime} = require('../middlewares/validator');

const router = express.Router();

//GET /stories: send all stories to the user 

router.get('/', controller.index);


//GET /connections/newController: send html form for creating a new story
router.get('/new', isLoggedIn ,controller.new);

//POST /connections: create a new story
router.post('/', isLoggedIn, validateConnectionCreation,validateTime, validateResult ,controller.create);

//GET /connections/:id send details of story identified by id

router.get('/:id', validateId ,controller.show);

//GET /connections/:id/edit: send html form for editing an existing story

router.get('/:id/edit', isLoggedIn, isAuthor,validateId ,controller.edit);

//PUT /connections/:id: update the story identified by id
router.put('/:id', isLoggedIn, isAuthor,validateId,validateConnectionUpdate,validateTime, validateResult ,controller.update);

//DELETE /connections/:id, delete the story identified by id

router.delete('/:id',isLoggedIn, isAuthor,validateId , controller.delete);




module.exports = router;