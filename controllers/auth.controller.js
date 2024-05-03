const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userValidationSchema = require('../validation/userValidation');
const resetPasswordSchema = require('../validation/resetPasswordValidation');

const userRegister = async (req, res) => {
    try {
      // Validate request body
      console.log("Validating User Registration");
      const { error } = userValidationSchema.validate(req.body);
      if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ message: errorMessage });
      }
      //User Registrarion
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      // Check if the error is a validation error
      if (error.errors && error.errors.username && error.errors.username.kind === 'string') {
        return res.status(400).json({ message: 'Username must be a string' });
      }
      // Handle other errors
      res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
      // Validate request body
      console.log("Validating User Login");
      const { error } = userValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      //User Login
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      
       // Update authToken field in user document
       user.authToken = token; // Store the token in the user document
       await user.save(); // Save the updated user document
      
       // Send response with token
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const forgotPassword = async (req, res) => {
    try {
        console.log("Forgot Password Initialed");
        const { username } = req.body;
        // Check if the user with the provided username exists
        const user = await User.findOne({ username });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        // Generate password reset token
        const token = jwt.sign({ userId: user._id }, 'your_reset_secret_key', { expiresIn: '1h' });

        // Send response to the user with token and instructions
        res.status(200).json({ message: 'Password reset token generated successfully.', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
      // Validate request body
      console.log("Validating Reset Password");
      const { error } = resetPasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      // Reset Password  
      console.log("Reset Password Initialed");

      // Check if newPassword and confirmPassword match
      if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      // Extract token from query parameters
      const token = req.query.token;
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }
  
      // Verify JWT token
      let userId;
      try {
        const decodedToken = jwt.verify(token, 'your_secret_key');
        userId = decodedToken.userId;
      } catch (err) {
        return res.status(400).json({ message: 'Invalid token' }); // Custom error message for invalid token
      }
  
      // Find user by ID
      const user = await User.findById({ userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password & Reset and Update the user's password in the database
      const newPassword = req.body.newPassword;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      // Send a success response
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

module.exports = {
    userRegister,
    userLogin,
    forgotPassword,
    resetPassword
}