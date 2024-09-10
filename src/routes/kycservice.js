const express = require('express');
const router = express.Router();
const kycServiceController = require('../controller/kycServices');

// CRUD Operations
router.post('/add', kycServiceController.add);
router.get('/:id', kycServiceController.edit);
router.get('/list', kycServiceController.list);
module.exports = router;
