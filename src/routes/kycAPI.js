const express = require('express');
const router = express.Router();
const kycApiController = require('../controller/kycAPI');

// CRUD Operations
router.post('/add', kycApiController.add);
router.get('/:id', kycApiController.edit);
router.get('/list', kycApiController.list);
module.exports = router;
