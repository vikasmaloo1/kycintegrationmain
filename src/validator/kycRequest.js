const Joi = require("joi");

const kycRequestValidator = {
  add: {
    userId: Joi.number().integer().required(),
    documentType: Joi.string().required(),
    documentData: Joi.object().required(),
    requestTimestamp: Joi.date().required(),
    requestStatus: Joi.string().valid("pending", "completed", "failed").required(),
    responseData: Joi.object().optional(),
    responseTimestamp: Joi.date().optional(),
    apiStatus: Joi.string().valid("success", "error").optional(),
    projectId: Joi.number().integer().required(),
    domainId: Joi.number().integer().required(),
    location: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional(),
    user: Joi.object().optional(),
    status: Joi.string().valid("active", "inactive").required(),
  },

  edit: {
    id: Joi.number().integer().required(),
    documentType: Joi.string().optional(),
    documentData: Joi.object().optional(),
    requestTimestamp: Joi.date().optional(),
    requestStatus: Joi.string().valid("pending", "completed", "failed").optional(),
    responseData: Joi.object().optional(),
    responseTimestamp: Joi.date().optional(),
    apiStatus: Joi.string().valid("success", "error").optional(),
    projectId: Joi.number().integer().optional(),
    domainId: Joi.number().integer().optional(),
    location: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional(),
    user: Joi.object().optional(),
    status: Joi.string().valid("active", "inactive").optional(),
  },

  list: {
    offset: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    userId: Joi.number().integer().optional(),
    documentType: Joi.string().optional(),
    requestStatus: Joi.string().valid("pending", "completed", "failed").optional(),
  },
};

module.exports = { kycRequestValidator };
