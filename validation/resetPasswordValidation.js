const Joi = require('joi');

// Validation schema for reset password payload
const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[a-zA-Z\\d@$!%*?&]+$')).messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required: Cannot be empty',
    'any.required': 'Password is required: Cannot be empty',
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character',
    'any.only': 'Passwords do not match'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Passwords do not match' // Customized error message for passwords not matching
  })
});

module.exports = resetPasswordSchema;
