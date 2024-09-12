const { connection } = require('../../models/allmodels');
const BaseService = require('../../services/baseService');
const { validateRequestInput } = require("../validator/index");
const { kycServiceValidator } = require("../validator/kycService");
const constants = require("../utils/constants");
const { Op } = require('sequelize');

const kycService = new BaseService(connection.kycService);

exports.add = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycServiceValidator.add, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const kyc = await kycService.create(requestData);
    return res.status(constants.CODES.SUCCESS).json({ success: true, data: kyc });
  } catch (error) {
    return res.status(constants.CODES.SERVER_ERROR).json({ success: false, error: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const requestData = req.body;
    const validation = validateRequestInput(kycServiceValidator.edit, requestData);
    
    if (!validation.isValid) {
      return res.status(constants.CODES.BAD_REQUEST).json({ success: false, error: validation.error });
    }

    const kyc = await kycService.findOneByCond({ id: requestData.id });
    if (!kyc) {
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
    const requestData = req.body;
    console.log('sdvsdvc',requestData);
    const validation = validateRequestInput(kycServiceValidator.list, requestData);
    
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

    const list = await kycService.findAll(opts);
    const totalCount = await kycService.count(opts);

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
