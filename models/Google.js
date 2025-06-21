const mongoose=require('mongoose');

const googleReview=new mongoose.Schema({
    review_details:{type:String},
    review_url:{type:String},
    added_by:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    doc_id:{type:mongoose.Schema.Types.ObjectId,ref:'Lead'},
    status:{type:'String'},
    changed_by_status:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});

module.exports=mongoose.model('Google',googleReview);