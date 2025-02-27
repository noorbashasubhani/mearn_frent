const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema({
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
const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;