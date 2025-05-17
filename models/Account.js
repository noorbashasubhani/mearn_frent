const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  transactionType: { type: String, required: true },
  amount: { type: Number, required: true },
  bankName: { type: String, required: true },
  remarks: { type: String }
},{
  timestamps:true
});

module.exports = mongoose.model('Account', accountSchema);
