const express = require('express');
const kycController = require('../controller/kycController');

const router = express.Router();

// Route to initiate KYC request
router.post('/kyc/initiate', kycController.initiateKYC);

module.exports = router;
