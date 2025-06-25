const mongoose = require('mongoose');

const TravelDetailSchema = new mongoose.Schema({
  date: { type: Date},
  category: { type: String},
  particulars: { type: String},
  distance: { type: Number },
  cost: { type: Number }
}, { _id: false });

const ReimbursementSchema = new mongoose.Schema({
  travelPurpose: { type: String },
  fromDate: { type: Date },
  toDate: { type: Date},
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Referencing employees
  reason: { type: String },
  travelDetails: [TravelDetailSchema],
  subtotal: { type: Number, default: 0 },
  advance: { type: Number, default: 0 },
  finalTotal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['P', 'A', 'R'],   // P = Pending, A = Approved, R = Rejected
    default: 'P'
  },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional: if tracking user
});

module.exports = mongoose.model('Reimbursement', ReimbursementSchema);
