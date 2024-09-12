const express = require('express');
const router = express.Router();
const kycServiceController = require('../controller/kycServices');

// CRUD Operations
router.post('/add', kycServiceController.add);
router.get('/list', kycServiceController.list);
router.get('getById/:id', kycServiceController.edit);
module.exports = router;
