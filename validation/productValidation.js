const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Product name must be a string',
    'string.empty': 'Product name is required: Cannot be empty',
    'any.required': 'Product name is required: Cannot be empty'
  }).custom((value, helpers) => {
    if (isNaN(value)) {
      return value;
    } else {
      return helpers.error('string.base');
    }
  }),
  quantity: Joi.number().required().min(0).messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be a positive number or zero',
    'any.required': 'Quantity is required'
  }).strict(),
  price: Joi.number().required().min(0).messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be a positive number or zero',
    'any.required': 'Price is required'
  }),
  image: Joi.string().allow('').optional()
}).strict();

module.exports = productSchema;
