const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Product_CRUD')
.then(() => {
  console.log('Connected to database');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Database connection failed:', error);
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server');
});