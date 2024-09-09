const express = require('express');
const multer = require('multer');
const kycController = require('../controller/kycController');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Route to initiate KYC request with file uploads
router.post('/kyc/initiate', upload.fields([
    { name: 'card_front_image', maxCount: 1 },
    { name: 'card_back_image', maxCount: 1 }
]), kycController.initiateKYC);

module.exports = router;
