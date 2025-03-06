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
   }
});
const Theam = mongoose.model("Theam",theamSchema);
module.exports=Theam;