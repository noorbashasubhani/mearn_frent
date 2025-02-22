const multer = require('multer');
const path = require('path');

// Configure storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});

// Only allow PDF files to be uploaded
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf/;
  const isValidFile = allowedFileTypes.test(path.extname(file.originalname).toLowerCase()) && 
                      allowedFileTypes.test(file.mimetype);

  if (isValidFile) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Initialize multer with the storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

module.exports = upload;
