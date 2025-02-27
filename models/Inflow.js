const mongoose = require("mongoose");

const inflowSchema = mongoose.Schema({
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
const Inflow = mongoose.model('Inflow', inflowSchema);
module.exports = Inflow;