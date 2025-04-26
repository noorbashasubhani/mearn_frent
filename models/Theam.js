const mongoose =require("mongoose");
const theamSchema = mongoose.Schema({
   destination_name:{
    type:String
   },
   holiday_type:{
    type:String
   },
   imges:{
    type:String
   },
   status:{
    type:String
   },added_by:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   }
},{
   timestamps:true
});
const Theam = mongoose.model("Theam",theamSchema);
module.exports=Theam;