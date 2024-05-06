const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify the file name format
  }
});

// Create multer instance
const upload = multer({ storage: storage });

module.exports = upload;
