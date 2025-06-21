const Thems = require("../models/Theam"); // Assuming you meant to use Theam model here
require('dotenv').config();
const multer = require("multer");
const path = require("path");

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save file to a temporary 'uploads' folder before uploading to Cloudinary
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Ensure the file has a unique name
    },
});

// Multer middleware for handling image files
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    },
});

// Controller for adding a new flyer
exports.addThems = (req, res) => {
    // Handle image upload with multer
    upload.single('imges')(req, res, async (err) => {
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

        // Destructure title and exp_Date from body
        const { destination_name, holiday_type} = req.body;

        if (!destination_name || !holiday_type) {
            return res.status(400).json({
                message: 'All fields (destination_name, holiday_type, status, and exp_Date) are required!',
            });
        }

        try {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'thems', // Specify the folder on Cloudinary (optional)
                resource_type: 'image', // Specify resource type as 'image'
            });

            // Create new 'Theam' document with Cloudinary URL
            const newTheam = new Thems({
                destination_name,
                holiday_type,
                status:'Y',
                imges: result.secure_url, // Save the Cloudinary URL of the uploaded image
            });

            // Save the new 'Theam' to the database
            await newTheam.save();

            res.status(201).json({
                message: 'Theam added successfully',
                data: newTheam,
            });
        } catch (error) {
            console.error('Error adding theam:', error);
            res.status(500).json({
                message: 'Something went wrong while adding the Theam',
                error: error.message,
            });
        }
    });
};


exports.getAllThems = async (req, res) => {
    try {
        // Fetch all Thems from the database
        const list = await Thems.find();

        // If no data is found, return a 404 message
        if (list.length === 0) {
            return res.status(404).json({ message: "No Thems found" });
        }

        // Return the fetched data with a success message
        res.status(200).json({ message: "success", data: list });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching Thems:", error);

        // Send a 500 error message
        res.status(500).json({
            message: "Failed to retrieve Thems",
            error: error.message, // Including the error message in the response
        });
    }
};

exports.getSingleThems = async (req, res) => {
    const {row_id}=req.params;
    try {
        // Fetch all Thems from the database
        const list = await Thems.findById({_id:row_id});
        // If no data is found, return a 404 message
        if (list.length === 0) {
            return res.status(404).json({ message: "No Thems found" });
        }
        // Return the fetched data with a success message
        res.status(200).json({ message: "success", data: list });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching Thems:", error);
        // Send a 500 error message
        res.status(500).json({
            message: "Failed to retrieve Thems",
            error: error.message, // Including the error message in the response
        });
    }
};



exports.updateThems = (req, res) => {
  // Handle image upload with multer
  upload.single('imges')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    const { row_id } = req.params;
    const { destination_name, holiday_type, status } = req.body;

    if (!destination_name || !holiday_type || !status) {
      return res.status(400).json({
        message: 'All fields (destination_name, holiday_type, status) are required!',
      });
    }

    try {
      let updateData = {
        destination_name,
        holiday_type,
        status,
      };

      // If a new image file is uploaded, upload it to Cloudinary and update URL
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'thems',
          resource_type: 'image',
        });
        updateData.imges = result.secure_url;
      }

      // Update Theam document by ID
      const updatedTheam = await Thems.findByIdAndUpdate(row_id, updateData, {
        new: true,
      });

      if (!updatedTheam) {
        return res.status(404).json({ message: 'Theam not found' });
      }

      res.status(200).json({
        message: 'Theam updated successfully',
        data: updatedTheam,
      });
    } catch (error) {
      console.error('Error updating Theam:', error);
      res.status(500).json({
        message: 'Something went wrong while updating the Theam',
        error: error.message,
      });
    }
  });
};
