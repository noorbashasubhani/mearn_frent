const Libdata = require('../models/Libdata');
require('dotenv').config();
const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const stream = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.memoryStorage();


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      const filetypes = /pdf/; // Allow only PDF files
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (extname && mimetype) {
          return cb(null, true);
      } else {
          cb(new Error("Only PDF files are allowed!"));
      }
  },
});

exports.addPdf = (req, res) => {
  // Handle PDF file upload with multer
  upload.single('libra_pdf')(req, res, async (err) => {
      if (err) {
          return res.status(400).json({
              message: err.message,
          });
      }

      // Ensure file is uploaded
      if (!req.file) {
          return res.status(400).json({
              message: 'No file uploaded!',
          });
      }

      // Ensure name is provided in the body
      const { name } = req.body;

      if (!name) {
          return res.status(400).json({
              message: 'Name is required!',
          });
      }

      try {
          // Upload the file from memory to Cloudinary
          const result = await cloudinary.uploader.upload_stream(
              { resource_type: 'raw', folder: 'library_pdfs' }, // Specify folder and auto-detect file type
              async (error, result) => {
                  if (error) {
                      return res.status(500).json({
                          message: 'Error uploading PDF to Cloudinary',
                          error: error.message,
                      });
                  }

                  // Create new Libdata document with Cloudinary URL
                  const newLibdata = new Libdata({
                      name,
                      libra_pdf: result.secure_url, // Save the Cloudinary URL of the uploaded PDF
                  });

                  // Save the new Libdata document to the database
                  await newLibdata.save();

                  res.status(201).json({
                      message: 'PDF uploaded and added successfully!',
                      data: newLibdata,
                  });
              }
          );

          // Create a readable stream for Cloudinary
          const bufferStream = new stream.PassThrough();
          bufferStream.end(req.file.buffer);
          bufferStream.pipe(result);
      } catch (error) {
          console.error('Error uploading PDF to Cloudinary:', error);
          res.status(500).json({
              message: 'Error uploading PDF to Cloudinary',
              error: error.message,
          });
      }
  });
};

exports.createLibdata = async (req, res) => {
  const { name } = req.body;
  const addedby = req.user.userId;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Please upload a PDF file' });
  }

  try {
    const newLibdata = new Libdata({
      name,
      libra_pdf: file.path,
      added_by: addedBy || null
    });

    await newLibdata.save();

    res.status(201).json({
      message: 'Libdata created successfully',
      data: newLibdata,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating libdata', error: error.message });
  }
};



// Get all Libdata entries
exports.getAllLibdata = async (req, res) => {
  try {
    // Retrieve all Libdata entries from the database
    const libdata = await Libdata.find();

    // If no entries are found, return a message
    if (libdata.length === 0) {
      return res.status(404).json({ message: 'No Libdata found' });
    }

    // Send a response with all the Libdata entries
    res.status(200).json({
      message: 'Libdata retrieved successfully',
      data: libdata,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving libdata', error: error.message });
  }
};


exports.delLib = async (req, res) => {
  const { id } = req.params;
  try {
    // Corrected the delete query by only using the _id field.
    const del = await Libdata.deleteOne({ _id: id });

    if (del.deletedCount === 0) {
      return res.status(404).json({ message: "Library  not found." });
    }

    res.status(200).json({ message: "Library Deleted Successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};