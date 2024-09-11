const Joi = require("joi");

const journeyValidator = {
  add: {
    kycServiceId: Joi.number().integer().required(),
    sequence: Joi.number().integer().required(),
    kycApiId: Joi.number().integer().required(),
  },

  edit: {
    id: Joi.number().integer().required(),
    kycServiceId: Joi.number().integer().optional(),
    sequence: Joi.number().integer().optional(),
    kycAPI: Joi.number().integer().optional(),
    status: Joi.string().valid("active", "inactive").optional(),
  },

  list: {
    offset: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    status: Joi.string().valid("active", "inactive").optional(),
  },
};

module.exports = { journeyValidator };
