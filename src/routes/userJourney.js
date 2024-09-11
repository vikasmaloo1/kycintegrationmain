const express = require('express');
const router = express.Router();
const userJourneyController = require('../controller/userJourney');

// CRUD Operations
router.post('/add', userJourneyController.add);
router.get('/:id', userJourneyController.edit);
router.get('/list', userJourneyController.list);
module.exports = router;
