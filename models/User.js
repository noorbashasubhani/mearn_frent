const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    email : {
        type : String,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password : {
        type : String
    },
    gender:{type:String},
    fathername:{type : String},
    mothername:{type : String},
    castname:{type:String},
    office_contact_no:{type:String},
    office_contact_email:{type:String},
    landline_no:{type:String},
    address:{type : String},
    contact_number:{type:Number},
    profile_img:{type:String},
    user_type:{type:String},
    partner_code:{type:String},
    status:{type:String},
    department_id:{type:String},
    designation_id:{type:String},
    joining_date:{type:Date},
    work_location:{type:Date},
    pan_number:{type:Date}
});
const User = mongoose.model("User",userSchema);
module.exports = User;