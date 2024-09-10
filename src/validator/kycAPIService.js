const Joi = require("joi");

const kycAPIServiceValidator = {
  add: {
    name: Joi.string().required(),
    thirdPartyApi: Joi.string().required(),
    apiURL: Joi.string().uri().required(),
    docRequireInRequest: Joi.boolean().required(),
    responseExample: Joi.object().required(),
    defaultSequence: Joi.number().integer().required(),
    status: Joi.string().valid('active', 'inactive').required(),
  },

  edit: {
    id: Joi.number().integer().required(),
    name: Joi.string().optional(),
    thirdPartyApi: Joi.string().optional(),
    apiURL: Joi.string().uri().optional(),
    docRequireInRequest: Joi.boolean().optional(),
    responseExample: Joi.object().optional(),
    defaultSequence: Joi.number().integer().optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
  },

  list: {
    offset: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    name: Joi.string().optional(),
  },
};

module.exports = { kycAPIServiceValidator };
