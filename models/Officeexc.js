const mongoose = require("mongoose");

const officeexcSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        unique:true
    },
    added_by:{
        type:String,
    },
    status:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now
    }
})
const Officeexc = mongoose.model('Officeexc', officeexcSchema);
module.exports = Officeexc;