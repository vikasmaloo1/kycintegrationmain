const express = require('express');
const router = express.Router();
const kycRequestController = require('../controller/kycRequest');

// CRUD Operations
router.post('/add', kycRequestController.add);
router.get('/:id', kycRequestController.edit);
router.get('/list', kycRequestController.list);
module.exports = router;
