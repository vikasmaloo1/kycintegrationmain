
const express = require('express');
const kycAPIservice = require('./kycservice'); // Import your route files

module.exports = (app) => {
  const router = express.Router();
  
  router.use('/kycService', kycAPIservice); // Apply your route here

  return router;
};
