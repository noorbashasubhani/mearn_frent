const mongoose = require("mongoose");
const recoverySchema = mongoose.Schema({
    recovery_name:{
        type:String
    },
    service_type:{
        type:String
    },
    total_amount:{
        type:Number
    },
    paid_amount:{
        type:Number
    },
    pending_amount:{
        type:Number
    },
    added_by:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});
const Recovery = mongoose.model("Recovery",recoverySchema);
module.exports=Recovery;