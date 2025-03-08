const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    annonymus:{
        type:String,
    },
    manager_id:{
        type:String,
    },
    escalation_reg:{
        type:String,
    },
    concern_specific:{
        type:String,
    },
    regarding_any_empp:{
        type:String,
    },
    regarding_any_req:{
        type:String,
    },
    other_reason:{
        type:String,
    },
    elaborate:{
        type:String,
    },
    added_by:{
        type : String,
    },
    status:{
        type:String
    },
    reason_for_close:{
        type:String
    },
    created_date:{
      type : Date,
      default: Date.now
    }

},{
    timestamps: true, // Automatically adds createdAt and updatedAt
  })

const Complaints = mongoose.model("Complaints",complaintSchema);
module.exports = Complaints;

