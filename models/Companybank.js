const mongoose = require("mongoose");

const companybankSchema = mongoose.Schema({
    bank_name:{
        type:String,
        required:true,
        unique:true
    },
    bank_acc:{
        type:String,
        required:true
    },
    nick_name:{
        type:String,
        required:true  
    }
});

const Companybank = mongoose.model("Companybank",companybankSchema);
module.exports = Companybank;