const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required: Cannot be empty',
      'any.required': 'Username is required: Cannot be empty'
    }),
    password: Joi.string().required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required: Cannot be empty',
      'any.required': 'Password is required: Cannot be empty'
    }).custom((value, helpers) => {
        if (isNaN(value)) {
          return value;
        } else {
          return helpers.error('string.base');
        }
      })
  });

module.exports = userSchema;
