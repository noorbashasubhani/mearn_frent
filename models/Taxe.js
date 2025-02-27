const mongoose = require("mongoose");

const texeSchema = mongoose.Schema({
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
const Taxe = mongoose.model('Taxe', texeSchema);
module.exports = Taxe;