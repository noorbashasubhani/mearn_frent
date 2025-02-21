const mongoose = require("mongoose");

const flyerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    exp_Date: {
        type: Date,
        required: true,
    },
});

const Flyer = mongoose.model("Flyer", flyerSchema);

module.exports = Flyer;
