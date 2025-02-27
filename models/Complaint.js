const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    annonymus:{
        type:String,
        required:true
    },
    manger_id:{
        type:Number,
        required:true
    },
    escalation_regarding:{
        type:String,
    },
    concern_specific:{
        type:String,
    },
    regard_any_request:{
        type:String,
    },
    other_reason:{
        type:String,
    },
    concern:{
        type:String,
    },
    added_by:{
        type : String,
    },
    created_date:{
      type : Date,
      default: Date.now
    }

})

const Complaints = mongoose.model("Complaints",complaintSchema);
module.exports = Complaints;

