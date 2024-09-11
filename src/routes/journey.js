const express = require('express');
const router = express.Router();
const journeyController = require('../controller/journey');

// CRUD Operations
router.post('/add', journeyController.add);
router.get('/:id', journeyController.edit);
router.get('/list', journeyController.list);
module.exports = router;
