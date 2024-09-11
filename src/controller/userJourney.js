const { connection } = require('../../models/allmodels');
const BaseService = require('../../services/baseService');
const { validateRequestInput } = require('../validator/index');
const { userJourneyValidator } = require('../validator/userJourney'); // Assuming userJourneyValidator is defined
const constants = require('../utils/constants');

// Create an instance of BaseService for the userJourney model
const userJourneyService = new BaseService(connection.userJourney);

exports.add = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(userJourneyValidator.add, requestData);

    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const userJourney = await userJourneyService.create(requestData);
    return res.status(constants.CODES.SUCCESS).json({ success: true, data: userJourney });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(userJourneyValidator.edit, requestData);

    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const userJourney = await userJourneyService.findOneByCond({ id: requestData.id });
    if (!userJourney) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.USER_JOURNEY.NOT_FOUND });
    }

    await userJourneyService.update(requestData, requestData.id);
    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.USER_JOURNEY.UPDATED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(userJourneyValidator.list, requestData);

    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const opts = {
      offset: parseInt(requestData.offset, 10) || 0,
      limit: parseInt(requestData.limit, 10) || 50,
      where: {},
    };

    if (requestData.status) {
      opts.where.status = requestData.status;
    }

    const list = await userJourneyService.findAll(opts);
    const totalCount = await userJourneyService.count(opts.where);

    return res.status(constants.CODES.SUCCESS).json({
      success: true,
      data: list,
      pagination: {
        currentCount: list.length,
        totalCount,
      },
    });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;

    const userJourney = await userJourneyService.findOneByCond({ id });
    if (!userJourney) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.USER_JOURNEY.NOT_FOUND });
    }

    return res.status(constants.CODES.SUCCESS).json({ success: true, data: userJourney });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};
