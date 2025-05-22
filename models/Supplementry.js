const mongoose=require('mongoose');

const supplementrySchema=new mongoose.Schema({
    location:{type:String},
    provison_date:{type:Date},
    supp_name:{type:String},
    supp_cost:{type:Number},
    doc_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lead'
    }
},{
    timestamps:true
});

const Supplementry=mongoose.model("Supplementry",supplementrySchema);
module.exports=Supplementry;