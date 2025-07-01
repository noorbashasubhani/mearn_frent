const mongoose = require('mongoose');

const cabEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  distance_kms: { type: Number, required: true },
  price_per_km: { type: Number, required: true },
  total_price: { type: Number, required: true },
  description: { type: String }
});

const ltaSchema = new mongoose.Schema({
  gogaga_reference_no: { type: String, required: true },
  invoice_no: { type: String, required: true },
  date_of_issue: { type: Date, required: true },

  cab_entries: [cabEntrySchema], // multiple rows like date, km, price per km, etc.

  total_cab_cost_excl_gst: { type: Number, required: true },
  gst_amount: { type: Number, required: true },
  total_cab_cost_incl_gst: { type: Number, required: true },

  payment_received: { type: Number, default: 0 },
  pending_payment: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('LTA', ltaSchema);
