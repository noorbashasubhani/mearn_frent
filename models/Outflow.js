const mongoose = require("mongoose");

const outflowSchema = mongoose.Schema({
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
const Outflow = mongoose.model('Outflow', outflowSchema);
module.exports = Outflow;