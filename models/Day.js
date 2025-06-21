const mongoose=require('mongoose');

const daySchema=new mongoose.Schema({
    day_no:{type:Number},
    day_title:{type:String},
    day_date:{type:Date,default:Date.now},
    hotel_id:{type:mongoose.Schema.Types.ObjectId,ref:'Onlinehotel'},
    distance:{type:String},
    meals_plan:{type:String},
    day_summary:{type:String},
    doc_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lead'
    }
},{
    timestamps:true
});

const Day=mongoose.model("Day",daySchema);
module.exports=Day;