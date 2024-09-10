const Joi = require("joi");

const kycServiceValidator = {
  add: {
    name: Joi.string().required(),
  },

  edit: {
    id: Joi.number().integer().required(),
    name: Joi.string().optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
  },

  list: {
    offset: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    name: Joi.string().optional(),
  },
};

module.exports = { kycServiceValidator };
