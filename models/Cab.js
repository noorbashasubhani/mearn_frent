const mongoose = require('mongoose');

// Define the schema for Cab
const cabSchema = new mongoose.Schema({
  state_name: { type: String, required: true },
  service_location: { type: String, required: true },
  supplier_name: { type: String, required: true, unique: true },
  email_contact: { type: String },
  vehicle_type: { type: String },
  seating_capacity: { type: Number },
  per_day_cost: { type: Number },
  rate_per_km: { type: Number },
  created_date: { type: Date, default: Date.now },
  color_status: { type: String },
});

// Create a model from the schema
const Cab = mongoose.model("Cab", cabSchema);

// Export the model
module.exports = Cab;
