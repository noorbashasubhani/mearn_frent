const mongoose=require('mongoose');

const visaSchema=new mongoose.Schema({
 nationality:{type:String},
 cost_per_person:{type:Number},
 no_of_pax:{type:String},
 total_cost:{type:String},
 doc_id:{type:mongoose.Schema.Types.ObjectId}
},{
    timestamps:true
});

const Visa=mongoose.model("Visa",visaSchema);
module.exports=Visa;