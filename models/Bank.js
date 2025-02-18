const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
    bank_name:{
        type:String,
        required:true
    },
    bank_branc:{
        type:String,
        required:true
    },
    bank_acc:{
        type:String,
        required:true,
        uniquer:true
    },
    bank_ifsc_code:{
        type:String,
        required:true,
    }
})

const Bank = mongoose.model("Bank",bankSchema);
module.exports = Bank;