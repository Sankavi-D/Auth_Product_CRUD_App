const Joi = require('joi');

// Validation schema for user password register
const userSchema = Joi.object({
    username: Joi.string().required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required: Cannot be empty',
      'any.required': 'Username is required: Cannot be empty'
    }).strict(),
    password: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[a-zA-Z\\d@$!%*?&]+$')).messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required: Cannot be empty',
      'any.required': 'Password is required: Cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character' 
    })
  });

module.exports = userSchema;
