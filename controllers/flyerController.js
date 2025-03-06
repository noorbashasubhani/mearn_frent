require('dotenv').config();
const multer = require("multer");
const path = require("path");
const Flyer = require("../models/Flyer");

const cloudinary = require('cloudinary').v2;

// Set up storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Define the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename based on the current timestamp
    },
});


// Create the multer instance
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only allow image files
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    }
});


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary Cloud Name
    api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API Secret
});
// Controller for adding flyer
exports.addFlyerss = (req, res) => {
    // Handle the image upload to Cloudinary
    upload.single('img')(req, res, async (err) => {
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

        // Ensure title and exp_Date are part of the body
        const { title, exp_Date } = req.body;

        if (!title || !exp_Date) {
            return res.status(400).json({
                message: 'Title and expiration date are required!',
            });
        }

        try {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'flyers', // Specify the folder in Cloudinary (optional)
                resource_type: 'image', // Specify the resource type
            });

            // Save the flyer info along with the Cloudinary image URL
            const newFlyer = new Flyer({
                title,
                img: result.secure_url, // Cloudinary URL
                exp_Date,
            });

            await newFlyer.save();

            res.status(201).json({
                message: 'Flyer added successfully',
                data: newFlyer,
            });
        } catch (error) {
            console.error('Error adding flyer:', error);
            res.status(500).json({
                message: 'Something went wrong while adding the flyer',
                error: error.message,
            });
        }
    });
};










// Controller for adding flyer
exports.addFlyer = (req, res) => {
    // Log the request body to check what data is being sent
    //console.log(req.body); // Add this line to see the form data
    upload.single("img")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }

        // Ensure title and exp_Date are part of the body
        const { title, exp_Date } = req.body;

        // If title or exp_Date is missing, return an error
        if (!title || !exp_Date) {
            return res.status(400).json({
                message: "Title and expiration date are required!",
            });
        }

        const imgPath = req.file ? `uploads/${req.file.filename}` : null;

        try {
            const newFlyer = new Flyer({
                title,
                img: imgPath,
                exp_Date,
            });

            await newFlyer.save();

            res.status(201).json({
                message: "Flyer added successfully",data:newFlyer
            });
        } catch (error) {
            console.error("Error adding flyer:", error);
            res.status(500).json({
                message: "Something went wrong while adding the flyer",
                error: error.message,
            });
        }
    });
};


exports.getFlyers = async (req, res) => {
    try {
        const flyers = await Flyer.find(); // Get all flyers from the database
        if (flyers.length === 0) {
            return res.status(404).json({
                message: "No flyers found.",
            });
        }
        res.status(200).json({
            message: "Flyers fetched successfully",
            data: flyers,
        });
    } catch (error) {
        console.error("Error fetching flyers:", error);
        res.status(500).json({
            message: "Something went wrong while fetching the flyers",
            error: error.message,
        });
    }
};





exports.getFlyersCloude = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const flyers = await Flyer.find().sort({ createdAt: -1 }); // Get all flyers from the database

        if (flyers.length === 0) {
            return res.status(404).json({
                message: "No flyers found.",
            });
        }

        // Map through the flyers to include Cloudinary URLs for images
        const updatedFlyers = flyers.map(flyer => {
            return {
                ...flyer.toObject(),
                img: flyer.img ? flyer.img : null,  // Cloudinary URL for the image
            };
        });

        res.status(200).json({
            message: "Flyers fetched successfully",
            data: updatedFlyers,
        });
    } catch (error) {
        console.error("Error fetching flyers:", error);
        res.status(500).json({
            message: "Something went wrong while fetching the flyers",
            error: error.message,
        });
    }
};


exports.delFlyer = async (req, res) => {
    const { id } = req.params;
    try {
      // Corrected the delete query by only using the _id field.
      const del = await Flyer.deleteOne({ _id: id });
  
      if (del.deletedCount === 0) {
        return res.status(404).json({ message: "Flyer not found." });
      }
  
      res.status(200).json({ message: "Flyer Deleted Successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong..." });
    }
  };
  
