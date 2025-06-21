const mongoose = require("mongoose");
const { applyTimestamps } = require("./Vendor");
const userSchema = mongoose.Schema({
    first_name : {type : String},
    last_name : {type : String},
    email : {type : String,match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']},
    password : {type : String},
    gender:{type:String},
    fathername:{type : String},
    mothername:{type : String},
    fathername_no:{type : String},
    mothername_no:{type : String},
    emp_id:{type:String},
    salary:{type:Number},
    leave:{type:String},
    date_of_birthday:{type:Date},
    mobile_no:{type:String},
    department_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
    designation_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Designation'
    },
    castname:{type:String},
    office_contact_no:{type:String},
    office_contact_email:{type:String},
    landline_no:{type:String},
    address:{type : String},
    contact_number:{type:Number},
    profile_img:{type:String},
    user_type:{type:String},
    status:{type:String},
    joining_date:{type:Date},
    work_location:{type:String},
    pan_number:{type:String},
    are_you_fresher:{type:String},
    previous_company:{type:String},
    previous_designation:{type:String},
    reporting_manager_name:{type:String},
    reporting_manager_no:{type:String},
    from_date:{type:String},
    to_date:{type:String},
    experience_details:{type:String},
    heigher_qualification:{type:String},
    qualification_year:{type:String},
    pecentage:{type:String},
    institute_name:{type:String},
    google_link:{type:String},
    bank_name:{type:String},
    branch_name:{type:String},
    bank_ac_number:{type:String},
    ifc_no:{type:String},
    code:{type:String},
    ref_no_one:{type:String},
    ref_no_two:{type:String},
    ref_mobile_one:{type:String},
    ref_mobile_two:{type:String},
    image:{type:String},
    acces_type:{type:String},
    assing_partners:{type:String},
    employee_id: {type:String},
    password_visible:{type:String},
    partner_type:{type:String},
    destination_type:{type:String},
    in_house_no:{type:String},
    requested_date: { type: Date, default: Date.now }
},{
    timestamps:true
});





const User = mongoose.model("User",userSchema);
module.exports = User;