
const mongoose=require('mongoose');
const suppllierSchema=new mongoose.Schema({
    sup_mail:{type:String},
    sup_quote:{type:String},
    service:{type:String},
    destination:{type:String},
    company_name:{type:String},
    contact_number:{type:String},
    sup_currecny:{type:String},
    currency_rate:{type:Number},
    total_cost:{type:Number},
    total_cost_consider:{type:Number},
    cost_bifurication:{type:String},
    doc_id:{type:mongoose.Schema.Types.ObjectId,
        ref:'Lead'
    }
},{
    timestamps:true
});

const Supplier=mongoose.model("Supplier",suppllierSchema);
module.exports=Supplier;