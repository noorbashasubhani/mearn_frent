const mongoose=require('mongoose');

 const commentSchema=new mongoose.Schema({
       lead_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lead'
       },
       message:{
        type:String
       },
       added_by:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       }
},{timestamps:true});

module.exports = mongoose.model('Comment', commentSchema);
