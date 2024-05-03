const express = require('express');
const router = express.Router();
const { userRegister, userLogin, forgotPassword, resetPassword } = require('../controllers/auth.controller');

// User registration
router.post('/register', userRegister);

// User login
router.post('/login', userLogin);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

module.exports = router;
