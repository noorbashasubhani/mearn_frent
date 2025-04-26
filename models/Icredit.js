const mongoose = require("mongoose");
const icreditSchema = mongoose.Schema({
    country_name:{
        type:String,
    },
    sup_name:{
        type:String,
    },
    issue_date:{
        type:Date,
    },
    valid_date:{
        type:Date,
    },
    ref_no:{
       type:String
    },
    amount:{
        type:Number
    },
    currency_type:{
        type:String
    },
    added_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true
})

const icredit = mongoose.model("icredit",icreditSchema);
module.exports = icredit;