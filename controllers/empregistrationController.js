const Users = require("../models/User");
const EmpBank = require("../models/Bank");
const Reference = require("../models/Reference");
const Education = require("../models/Education");
const Rreviousemp = require("../models/Previousempdetails");

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
