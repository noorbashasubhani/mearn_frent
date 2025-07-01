const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  sac_code: { type: String, required: true }, // Service Accounting Code
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  taxable_value: { type: Number, required: true },
  gst_percent: { type: Number, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true }
}, { _id: false });

const gstInvoiceSchema = new mongoose.Schema({
  ghrn_no: { type: String, required: true }, // Unique booking or reference number
  date_of_issue: { type: Date, required: true },
  payment_type: { type: String, required: true }, // e.g., UPI, NEFT, Cash
  rounded_off: { type: Number, default: 0 },
  items: [itemSchema], // Array of items (SAC entries)
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Optional: track who created
}, { timestamps: true });

module.exports = mongoose.model('GSTInvoice', gstInvoiceSchema);
