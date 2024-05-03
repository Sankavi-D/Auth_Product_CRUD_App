const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

// Public routes
router.get('/', authenticateToken, getProducts);
router.get('/:id', authenticateToken, getProduct);

// Protected routes (require authentication)
router.use(authenticateToken);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
