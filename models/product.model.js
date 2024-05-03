const mongoose = require('mongoose');
const Joi = require('joi');
const productValidationSchema = require('../validation/productValidation');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter Product Name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = {
    Product,
    productValidationSchema
};
