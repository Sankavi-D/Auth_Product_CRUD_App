const Product  = require('../models/product.model');
const productValidationSchema = require('../validation/productValidation');

const getProducts = async (req, res) => {
    try {
      console.log("Getting All Products");
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getProduct = async (req, res) => {
    try {
      console.log("Getting a Single Product");
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req, res) => {
    try {
      // Validate request body
      console.log("Validating Product");
      const { error } = productValidationSchema.validate(req.body);
      if (error) {
          const errorMessage = error.details.map(detail => detail.message).join(', ');
          return res.status(400).json({ message: errorMessage });
      }

      // Create Product
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
      console.log("Updating a Product Details");
      const { id } = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const deleteProduct = async (req, res) => {
    try {
      console.log("Deleting a Product");
      const { id } = req.params;
  
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};