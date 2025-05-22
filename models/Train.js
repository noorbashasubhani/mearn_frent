const mongoose=require('mongoose');


const trainSchema=new mongoose.Schema({
    fare_source:{type:String},
    train_name:{type:String},
    train_number:{type:String},
    start_date:{type:Date},
    end_date:{type:Date},
    start_city:{type:String},
    end_city:{type:String},
    duration:{type:String},
    class_name:{type:String},
    site_available:{type:Number},
    cost:{type:Number},
    loading:{type:Number},
    total_cost:{type:Number},
    doc_id:{type:mongoose.Schema.Types.ObjectId,
        ref:'Lead'
    }
},{timestamps:true});

const Train=mongoose.model("Train",trainSchema);
module.exports=Train;
