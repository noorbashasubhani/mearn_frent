const mongoose = require("mongoose");

const OtherexcSchema = mongoose.Schema({
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
const Otherexc = mongoose.model('Otherexc', OtherexcSchema);
module.exports = Otherexc;