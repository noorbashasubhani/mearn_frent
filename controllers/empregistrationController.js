const Users = require("../models/User");
const EmpBank = require("../models/Bank");
const Reference = require("../models/Reference");
const Education = require("../models/Education");
const Rreviousemp = require("../models/Previousempdetails");
const jwt = require('jsonwebtoken');  
const bcrypt = require('bcryptjs'); 


exports.empRegistration = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    fathername,
    address,
    contact_number,
    user_type,
    partner_code,
    status,
    department_id,
    designation_id,
    joining_date,
    work_location,
    pan_number,
    bank_name,
    bank_branc,
    bank_acc,
    bank_ifsc_code,
    first_ref,first_ref_no,second_ref,second_ref_no,
    heigher_education,qualification_year,percenteage,institute_name,google_link,
    company_name,designation_name,mangeer_name,mangeer_no,from_date,to_date,share_your_exp
  } = req.body;

  try {
    // Step 1: Create a new user document (Employee)
    const userDetails = new Users({
      first_name,
      last_name,
      email,
      password,
      gender,
      fathername,
      address,
      contact_number,
      user_type: 'E',
      department_id,
      status: 'P',
      joining_date,
      work_location,
      pan_number
    });

    const savedUser = await userDetails.save();
    // Step 2: Create a new bank document (Employee Bank Details)
    const bankDetails = new EmpBank({
      bank_name,
      bank_branc,
      bank_acc,
      bank_ifsc_code,
      user_id: savedUser._id // Save the reference to the saved user (foreign key reference)
    });
    const savedBank = await bankDetails.save();

    const ReferDetails = new Reference({
        first_ref,first_ref_no,second_ref,second_ref_no,user_id:savedUser._id 
    })
    const SaveRef = await ReferDetails.save();

    const Edudetails = new Education({
        heigher_education,qualification_year,percenteage,institute_name,google_link,user_id:savedUser._id
    });
     const SaveEdu = await Edudetails.save();

     const PrevousDetails = new Rreviousemp({
        company_name,designation_name,mangeer_name,mangeer_no,from_date,to_date,share_your_exp,user_id:savedUser._id
     });
     const savePreviosDetails =await PrevousDetails.save();
    // Step 3: Respond with a success message
    res.status(200).json({ message: "Employee and Bank details saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};





exports.getUserWithReference = async (req, res) => {
  const { user_id } = req.params;  // user_id comes from the URL params
  
  try {
    // Find user and populate the related fields: bank, reference, education, and previous employment details
    const userDetails = await Users.findById(user_id);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // You can also populate bank details if needed (directly related as bank is stored in EmpBank collection)
    const refeDetails = await Reference.findOne({ user_id: user_id });
    if (!refeDetails) {
      return res.status(404).json({ message: 'Reference details not found' });
    }


    const bankDetails = await EmpBank.findOne({ user_id: user_id });
    if (!bankDetails) {
      return res.status(404).json({ message: 'Bank details not found' });
    }

    const EducDetails = await Education.findOne({ user_id: user_id });
    if (!EducDetails) {
      return res.status(404).json({ message: 'Bank details not found' });
    }

    const empDetails = await Rreviousemp.findOne({ user_id: user_id });
    if (!empDetails) {
      return res.status(404).json({ message: 'Bank details not found' });
    }

    // Combine both user and bank details
    res.status(200).json({
      message:"Data Feching successfully....", 
      user: userDetails,
      bankDetails: bankDetails,
      Reference:refeDetails,
      Education:EducDetails,
      previousEmp:empDetails
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
};


exports.empDetails = async(req,res)=>{
    try{
        const list=await Users.find();
    res.status(200).json({message:"success",data:list});
    }catch(error){
    res.status(500).json({message:"failed"});
    }
}


exports.parttRegistartions = async (req, res) => {
  const {
    first_name, last_name, email, password, gender,
    fathername, mothername, fathername_no, mothername_no,
    date_of_birthday, mobile_no, department_id, designation_id, castname,
    address, contact_number, user_type,status, pan_number, are_you_fresher, previous_company,
    previous_designation, reporting_manager_name, reporting_manager_no, from_date,
    to_date, experience_details, heigher_qualification, qualification_year,
    pecentage, institute_name, google_link, bank_name, branch_name, bank_ac_number, ifc_no,
    ref_no_one, ref_no_two, ref_mobile_one, ref_mobile_two,employee_id,password_visible,partner_type
  } = req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Fetch the last user to generate a dynamic Empcode
    const latestUser = await Users.findOne().sort({ employee_id: -1 }); // Sort by employee_id in descending order
    let newEmpcode;
    if (latestUser) {
      // If there are users, generate the next Empcode by incrementing the last one
     const lastEmpcode = parseInt(latestUser.employee_id.slice(3)); // Extract number part from "EMP" prefix
     //newEmpcode = 'EMP00010';
     newEmpcode = 'PAR' + (lastEmpcode + 1).toString().padStart(4, '0'); // Generate new Empcode like EMP0001, EMP0002, etc.
    } else {
      // If there are no users, initialize the employee_id to 'EMP0001'
      newEmpcode = 'PAR0001';
    }
    // Create new user with the provided details and the dynamically generated Empcode
    const newData = new Users({
      first_name, last_name, email, password: hashedPassword, gender,
      fathername, mothername, fathername_no, mothername_no,
      date_of_birthday, mobile_no, department_id, designation_id, castname,
      address, contact_number, user_type: 'P',status:'P', pan_number, are_you_fresher, previous_company,
      previous_designation, reporting_manager_name, reporting_manager_no, from_date,
      to_date, experience_details, heigher_qualification, qualification_year,
      pecentage, institute_name, google_link, bank_name, branch_name, bank_ac_number, ifc_no,
      ref_no_one, ref_no_two, ref_mobile_one, ref_mobile_two,
      employee_id: newEmpcode,password_visible,partner_type // Assign the dynamically generated Empcode
    });
    // Save the new user to the database
    const savedUser = await newData.save();
    // Send response with success message and the saved user data
    return res.status(200).json({
      message: 'Data Saved successfully!',
      employee_id: savedUser.employee_id, // Return the generated employee_id to confirm it was saved
      user: savedUser // Optionally, return the whole user object
    });
  } catch (error) {
    // Handle errors and send response
    return res.status(500).json({
      message: 'Data Not Saved',
      error: error.message
    });
  }
};