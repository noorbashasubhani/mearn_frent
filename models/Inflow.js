const mongoose = require("mongoose");

const inflowSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    added_by:{
        type:String,
    },
    status:{
        type:String
    }
},{
    timestamps:true
})
const Inflow = mongoose.model('Inflow', inflowSchema);
module.exports = Inflow;