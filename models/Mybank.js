const mongoose = require('mongoose');
const mybankSchema = new mongoose.Schema({
  bank_name: {
    type: String,
  },
  acc_no: {
    type: String,
  },
  nice_name: {
    type: String,
  },
  status:{
    type: String
  }
}, {
  timestamps: true,
});
module.exports = mongoose.model("Mybank", mybankSchema);
