const { connection } = require('../../models/allmodels');
const BaseService = require('../../services/baseService');
const { validateRequestInput } = require('../validator/index');
const { journeyValidator } = require('../validator/journey');
const constants = require('../utils/constants');
const { Op } = require('sequelize'); 

// Create an instance of BaseService with the journey model
const journeyService = new BaseService(connection.journey);
 
exports.add = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(journeyValidator.add, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const journey = await journeyService.create(requestData);
    return res.status(constants.CODES.SUCCESS).json({ success: true, data: journey });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(journeyValidator.edit, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const journey = await journeyService.findOneByCond({ id: requestData.id });
    if (!journey) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.JOURNEY.NOT_FOUND });
    }

    await journeyService.update(requestData, requestData.id);
    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.JOURNEY.UPDATED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(journeyValidator.list, requestData);
    
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

    const list = await journeyService.findAll(opts);
    const totalCount = await journeyService.count(opts.where);

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

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;
    const validation = validateRequestInput(Joi.object({ id: Joi.number().integer().required() }), { id });
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const journey = await journeyService.findOneByCond({ id });
    if (!journey) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.JOURNEY.NOT_FOUND });
    }

    await journeyService.delete(id);
    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.JOURNEY.DELETED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};
