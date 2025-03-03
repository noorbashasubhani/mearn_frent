const mongoose=require("mongoose");


const assetSchema = mongoose.Schema({
stock_name:{
    type:String
},
added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
created_date:{
    type:Date,
    default:Date.now
}
})


const Asset = mongoose.model("Asset",assetSchema);
module.exports=Asset;