const mongoose = require("mongoose");

const libdataSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
libra_pdf:{
    type:String,
    required:true
},
added_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
},{
    timestamps:true
});

const Libdata = mongoose.model("Libdata",libdataSchema);

module.exports = Libdata;