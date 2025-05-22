const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  fare_source: { type: String },
  bus_name: { type: String },
  start_datetime: { type: Date },
  reach_datetime: { type: Date },
  start_city: { type: String },
  reach_city: { type: String },
  journey_duration: { type: String },
  bus_class: { type: String },
  seats_available: { type: Number },
  cost_considered: { type: Number },
  loading_on_bus: { type: Number },
  total_bus_fare: { type: Number },
  doc_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
   }
}, {
  timestamps: true // ✅ Automatically adds createdAt and updatedAt
});

const Buse = mongoose.model("Buse", busSchema);
module.exports = Buse;
