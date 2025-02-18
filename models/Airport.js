const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  airport_name: { type: String, required: true },
  airport_city: { type: String, required: true },
  airport_code: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
});

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport;  // Make sure you export the model correctly
