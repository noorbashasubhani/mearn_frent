const mongoose=require('mongoose');

const tcsSchema=new mongoose.Schema({
 tcs_per:{type:String},
 tcs_amount:{type:Number},
 invoice:{type:String},
 adhar:{type:String},
 doc_id:{type:mongoose.Schema.Types.ObjectId}
},{
    timestamps:true
});

const Tcs=mongoose.model("Tcs",tcsSchema);
module.exports=Tcs;