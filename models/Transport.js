const mongoose=require('mongoose');
const transportSchema=new mongoose.Schema({
    transport_type:{type:String,enum:["Private","SIC"]},
    transport_cat:{type:String,enum:["All Tour Transfer","All Airport Transfer","One Way Airport Transfer","Tour"]},
    transport_name:{type:String},
    transport_location:{type:String},
    transport_vehicle:{type:String},
    transport_site_cap:{type:Number},
    transport_start_date:{type:Date,default:Date.now},
    transport_end_date:{type:Date,default:Date.now},
    no_of_days:{type:Number},
    no_of_vehicles:{type:Number},
    cost_per_vehicle:{type:Number},
    total_cost:{type:Number},
    doc_id:{type:mongoose.Schema.Types.ObjectId,ref:'Lead'}
},{
    timestamps:true
});
const Transport=mongoose.model("Transport",transportSchema);
module.exports=Transport;