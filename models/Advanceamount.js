const mongoose=require('mongoose');
const advanceamountSchema=new mongoose.Schema({
     amount:{
        type:Number
     },
     mangersids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     }],
     added_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },status:{
        type:String
     }
},{timestamps:true});

module.exports = mongoose.model('Advanceamount', advanceamountSchema);
