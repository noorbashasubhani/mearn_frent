const mongoose=require('mongoose');
const User = require('./User'); // Assuming you have a User model

const holidaypackageSchema = mongoose.Schema(
    {
    package_code:{type:String},
    package_name:{type:String},
    duration:{type:String},
    city:{type:String},
    destination:{type:String},
    cost:{type:String},
    added_by: {
      type:String
      },
      user_id: { type:String },
},
{timestamps:true}
);

const holidaypackage = mongoose.model("holidaypackage",holidaypackageSchema);
module.exports=holidaypackage;