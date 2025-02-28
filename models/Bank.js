const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
    bank_name:{
        type:String
    },
    bank_branc:{
        type:String
    },
    bank_acc:{
        type:String
    },
    bank_ifsc_code:{
        type:String
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Referring to User model
})

const Bank = mongoose.model("Bank",bankSchema);
module.exports = Bank;