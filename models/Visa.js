const mongoose=require('mongoose');

const visaSchema=new mongoose.Schema({
  destination_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
 nationality:{type:String},
 cost_per_person:{type:Number},
 no_of_pax:{type:Number},
 total_cost:{type:Number},
 doc_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
});

const Visa=mongoose.model("Visa",visaSchema);
module.exports=Visa;