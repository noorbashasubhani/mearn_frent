const mongoose = require("mongoose");

const flyerSchema = new mongoose.Schema({
    title: {
        type: String
    },
    img: {
        type: String,
        required: true,
    },
    exp_Date: {
        type: Date
    },
    
},{
    timestamps: true, // Automatically adds createdAt and updatedAt
  });

const Flyer = mongoose.model("Flyer", flyerSchema);

module.exports = Flyer;
