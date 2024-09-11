const { connection } = require('../../models/allmodels');
const BaseService = require('../../services/baseService');
const { validateRequestInput } = require('../validator/index');
const { kycRequestValidator } = require('../validator/kycRequest');
const constants = require('../utils/constants');
const { Op } = require('sequelize'); 

// Create an instance of BaseService with the kycRequests model
const kycRequestService = new BaseService(connection.kycRequest);

exports.add = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycRequestValidator.add, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const kycRequest = await kycRequestService.create(requestData);
    return res.status(constants.CODES.SUCCESS).json({ success: true, data: kycRequest });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycRequestValidator.edit, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const kycRequest = await kycRequestService.findOneByCond({ id: requestData.id });
    if (!kycRequest) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.KYC_REQUEST.NOT_FOUND });
    }

    await kycRequestService.update(requestData, requestData.id);
    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.KYC_REQUEST.UPDATED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycRequestValidator.list, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const opts = {
      offset: parseInt(requestData.offset, 10) || 0,
      limit: parseInt(requestData.limit, 10) || 50,
      where: {},
    };

    if (requestData.userId) {
      opts.where.userId = requestData.userId;
    }

    if (requestData.documentType) {
      opts.where.documentType = requestData.documentType;
    }

    if (requestData.requestStatus) {
      opts.where.requestStatus = requestData.requestStatus;
    }

    const list = await kycRequestService.findAll(opts);
    const totalCount = await kycRequestService.count(opts.where);

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

    const kycRequest = await kycRequestService.findOneByCond({ id });
    if (!kycRequest) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.KYC_REQUEST.NOT_FOUND });
    }

    await kycRequestService.delete(id);
    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.KYC_REQUEST.DELETED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};
