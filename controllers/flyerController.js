const multer = require("multer");
const path = require("path");
const Flyer = require("../models/Flyer");

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
  
