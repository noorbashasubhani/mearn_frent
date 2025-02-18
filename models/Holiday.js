const mongoose = require('mongoose');
const holidaySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    holiday_date:{
        type:Date,
        required:true,
        unique:true
    },
    status:{
        type:String
    },    
})

const Holiday = mongoose.model("Holiday",holidaySchema);
module.exports = Holiday;
