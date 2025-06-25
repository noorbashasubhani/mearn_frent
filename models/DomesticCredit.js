// model/Credit.js
const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  city: String,
  serviceType: String,
  supplierName: String,
  cnIssuedDate: Date,
  validTill: Date,
  refNumber: String,
  amount: Number,
  currency_rate:String,
  travel_type:String
});

module.exports = mongoose.model('DomesticCredit', creditSchema);
