const mongoose = require("mongoose");

const PreviousempdetailsSchema = mongoose.Schema({
    company_name:{
        type:String
    },
    designation_name:{
        type:String,
    },
    mangeer_name:{
        type:String,
    },
    mangeer_no:{
        type:String
    },
    from_date:{
        type:Date
    },
    to_date:{
        type:Date
    },
    share_your_exp:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    }
});
const Previousempdetails = mongoose.model('Previousempdetails', PreviousempdetailsSchema);
module.exports = Previousempdetails;