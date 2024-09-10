const Joi = require('joi');

exports.validateRequestInput = (schema, object) => {
  const isValid = Joi.object().keys(schema).validate(object);
  if (isValid.hasOwnProperty('error')) {
    return { isValid: false, error: isValid.error };
  }
  return { isValid: true, error: null };
};
