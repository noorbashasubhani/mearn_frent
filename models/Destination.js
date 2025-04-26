const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema({
    destination_name: {
        type: String,
        unique: true
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    destination: {
        type: String
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
         type: mongoose.Schema.Types.ObjectId,
        ref:'Destination'
    }
}, { timestamps: true }); // Corrected to 'timestamps: true'

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
