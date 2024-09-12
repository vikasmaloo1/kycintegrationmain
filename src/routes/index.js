
const express = require('express');
const kycAPIservice = require('./kycservice');
const kycAPIs = require('./kycAPI');
const userJourney = require('./userJourney');
const journey = require('./journey');
const kycRequest = require('./kycRequest');
const kycRoutes = require('./KycMain');

module.exports = (app) => {
  const router = express.Router();
  
  router.use('/kycService', kycAPIservice);
  router.use('/kycAPI', kycAPIs);
  router.use('/userJourney', userJourney);
  router.use('/journey', journey);
  router.use('/', kycRoutes);
  router.use('/kycRequest', kycRequest);
  
  

  return router;
};
