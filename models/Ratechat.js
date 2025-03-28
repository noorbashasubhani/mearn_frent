const mongoose = require('mongoose');

// Define the schema for the Ratechat collection
const rateSchema = mongoose.Schema({
  city_name: {
    type: String,
  },
  hotel_name: {
    type: String,
  },
  expire_date: {  // Fixed the key name from expair_date to expire_date
    type: Date // Use Date.now to default to the current date
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the model based on the schema
const Ratechat = mongoose.model("Ratechat", rateSchema);

// Export the model
module.exports = Ratechat;
