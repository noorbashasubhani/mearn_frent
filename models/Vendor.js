const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String // Corrected here (capital "S")
    },
    email: {
        type: String, // Corrected here (capital "S")
        unique: true,
        required: true
    },
    password: {
        type: String, // Corrected here (capital "S")
        required: true
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
