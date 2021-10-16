const express = require('express');
const controller = require('../controllers/connectionController');

const router = express.Router();

//GET /stories: send all stories to the user 

router.get('/', controller.index);


//GET /connections/newController: send html form for creating a new story
router.get('/newConnection', controller.new);

//POST /stories: create a new story
router.post('/', controller.create);

//GET /connections/:id send details of story identified by id

router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form for editing an existing story

router.get('/:id/edit', controller.edit);

//PUT /stories/:id: update the story identified by id
router.put('/:id', controller.update);

//DELETE /stories/:id, delete the story identified by id

router.delete('/:id', controller.delete);




module.exports = router;