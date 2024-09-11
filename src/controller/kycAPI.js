// controllers/KycAPIController.js
const { connection } = require('../../models/allmodels');
const BaseService = require('../../services/baseService');
const { validateRequestInput } = require('../validator/index');
const { kycAPIValidator } = require('../validator/kycAPI'); // Assume you have kycAPIValidator defined
const constants = require('../utils/constants');
const { Op } = require('sequelize'); 


const kycAPIService = new BaseService(connection.kycAPI);
exports.add = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycAPIValidator.add, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const kycAPI = await kycAPIService.create(requestData);
    return res.status(constants.CODES.SUCCESS).json({ success: true, data: kycAPI });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycAPIValidator.edit, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const existingKycAPI = await kycAPIService.findOneByCond({ id: requestData.id });
    if (!existingKycAPI) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.KYC.NOT_FOUND });
    }

    await kycAPIService.update(requestData, requestData.id);
    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.KYC.UPDATED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const requestData = req.query; // Use query parameters for listing
    const validation = validateRequestInput(kycAPIValidator.list, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const opts = {
      offset: parseInt(requestData.offset, 10) || 0,
      limit: parseInt(requestData.limit, 10) || 50,
      where: {},
    };

    if (requestData.name) {
      opts.where.name = { [Op.like]: `%${requestData.name}%` };
    }

    const list = await kycAPIService.findAllByCond(opts);
    const totalCount = await kycAPIService.count(opts.where);

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
    const id = req.params.id; // Use route parameters for single item retrieval
    const kycAPI = await kycAPIService.findOneByCond({ id });
    
    if (!kycAPI) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.KYC.NOT_FOUND });
    }

    return res.status(constants.CODES.SUCCESS).json({ success: true, data: kycAPI });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id; // Use route parameters for deletion
    const result = await kycAPIService.delete(id);

    if (result === 0) {
      return res.status(constants.CODES.NOT_FOUND).json({ success: false, message: constants.MESSAGES.KYC.NOT_FOUND });
    }

    return res.status(constants.CODES.SUCCESS).json({ success: true, message: constants.MESSAGES.KYC.DELETED });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};
