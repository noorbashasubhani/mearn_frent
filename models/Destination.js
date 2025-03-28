const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema({
    destination_name: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    is_country: {
        type: String,
    },
    is_state: {
        type: String,
    },
    is_city: {
        type: String,
    },
    is_cruise: {
        type: String,
    },
    country_id: {
        type: String,
    },
    state_id: {
        type: String,
    },
    added_by: {
        type: String
    }
}, { timestamps: true }); // Corrected to 'timestamps: true'

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
