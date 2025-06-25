const mongoose = require('mongoose');

const DeductionSchema = new mongoose.Schema({
  partnerId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deductionType:    { type: String, enum: ['one_time','recurring']},
  cycle:            { type: String },    // YYYY-MM for one_time
  amount:           { type: Number },
  deductionTowards: { type: String, enum: ['packages','others']},
  ghrnNumber:       { type: String },    // shown only for 'others'
  particulars:      { type: String },
  createdAt:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deduction', DeductionSchema);