const mongoose = require('mongoose');
const advanceSalarySchema = new mongoose.Schema({
    amount: {
      type: Number
    },
    managers_names: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String
    }
  },{
    timestamps:true
  });
  


const Advancesalary = mongoose.model("Advancesalary",advanceSalarySchema); 

module.exports=Advancesalary;