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
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },status:{
        type:String
    }
},{
    timestamps:true
});
const Recovery = mongoose.model("Recovery",recoverySchema);
module.exports=Recovery;