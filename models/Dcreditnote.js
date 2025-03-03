const mongoose = require("mongoose");
const dcreditnoteSchema = mongoose.Schema({
    city_name:{
        type:String,
    },
    service_type:{
        type:String
    },
    hotel_name:{
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
    created_date:{
        type:Date,
        default:Date.now
    },
    added_by:{
        type:String
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

const dcreditnote = mongoose.model("dcreditnote",dcreditnoteSchema);
module.exports = dcreditnote;