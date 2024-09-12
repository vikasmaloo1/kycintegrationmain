const { connection } = require('../../models/allmodels');
const BaseService = require('../../services/baseService');
const constants = require('../utils/constants');
const { Op } = require('sequelize');

const UserJourneyService = new BaseService(connection.userJourney);
const JourneyService = new BaseService(connection.journey);
const KYCAPIService = new BaseService(connection.kycAPI);
const KYCService = new BaseService(connection.kycService);

exports.getNextKycStep = async (req, res) => {
  const { userId, useCase } = req.body;

  try {
    // Check if the user has an existing journey
    const existingJourney = await UserJourneyService.findOneByCond({ userId });

    if (existingJourney) {
      // Journey exists, check if it's finished
      if (existingJourney.isFinished) {
        return res.status(constants.CODES.SUCCESS).json({
          success: true,
          message: 'All steps completed for this user.',
        });
      }

      // Fetch the next step in the journey
      const nextJourney = await JourneyService.findOneByCond({
        kycServiceId: useCase,
        sequence: existingJourney.lastJourneyId + 1,
      });

      if (!nextJourney) {
        return res.status(constants.CODES.SUCCESS).json({
          success: true,
          message: 'No further steps found, journey might be finished.',
        });
      }

      const nextKycAPI = await KYCAPIService.findOneByCond({ id: nextJourney.kycApiId });

      return res.status(constants.CODES.SUCCESS).json({
        success: true,
        data: nextKycAPI,
      });
    } else {
      // No journey found, create a new journey
      const fullJourney = await JourneyService.findAllByCond({
        kycServiceId: useCase,
      });

      if (!fullJourney.length) {
        return res.status(constants.CODES.NOT_FOUND).json({
          success: false,
          message: 'No KYC steps found for the given use case.',
        });
      }

      // Return all KYC APIs in sequence for the new user
      const kycAPIs = await Promise.all(
        fullJourney.map(journey => KYCAPIService.findOneByCond({ id: journey.kycApiId }))
      );

      return res.status(constants.CODES.SUCCESS).json({
        success: true,
        data: kycAPIs,
      });
    }
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};
