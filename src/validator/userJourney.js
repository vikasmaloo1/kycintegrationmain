const Joi = require("joi");

const userJourneyValidator = {
  add: {
    userId: Joi.number().integer().required(),
    lastJourneyId: Joi.number().integer().required(),
    isFinished: Joi.boolean().required(),
    status: Joi.string().valid('ongoing', 'completed', 'pending').required(),
  },

  edit: {
    id: Joi.number().integer().required(),
    lastJourneyId: Joi.number().integer().optional(),
    isFinished: Joi.boolean().optional(),
    status: Joi.string().valid('ongoing', 'completed', 'pending').optional(),
  },

  list: {
    offset: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    status: Joi.string().valid('ongoing', 'completed', 'pending').optional(),
  },
};

module.exports = { userJourneyValidator };
