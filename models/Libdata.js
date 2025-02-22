const mongoose = require("mongoose");

const libdataSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
libra_pdf:{
    type:String,
    required:true
}
});

const Libdata = mongoose.model("Libdata",libdataSchema);

module.exports = Libdata;