// userController.js

const User = require('../models/User'); // Assuming the User model is defined here
const jwt = require('jsonwebtoken');  
const bcrypt = require('bcryptjs'); 


exports.userChecking = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email, password: pass }); // Plain text password check
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    res.status(200).json({ message: "User authenticated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


exports.addUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  
  try {
      // Check if the email already exists
      const vendorEmail = await User.findOne({ email: email });
      if (vendorEmail) {
          return res.status(400).json({ message: "Email Already Exists" });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
          first_name,
          last_name,
          email,
          password: hashedPassword
      });

      // Save the new user to the database
      await newUser.save();

      res.status(200).json({ message: "User Deails Added Successfully" }); 
  } catch (error) {
      console.error(error); // It's always a good idea to log the error for debugging
      res.status(400).json({ message: "Something went wrong" });
  }
};


exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
          return res.status(400).json({ message: "Invalid email " });
      }

      // Compare provided password with stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(400).json({ message: "Invalid  password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET_KEY, // Secret key from environment variables
        { expiresIn: '5hour' } // Token expiration time (e.g., 1 hour)
      );


      // Login successful - send success message
      res.status(200).json({ message: "User Login successful",token: token, user_id:user._id });

  } catch (error) {
      console.error("Login error:", error.message); // Log error for debugging purposes
      res.status(400).json({ message: "Something went wrong" });
  }
};

exports.userList = async (req, res) => {
  try {
    // Fetch all users from the database
    const list = await User.find();

    // Return a success response with the user list
    res.status(200).json(list);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching users: ", error);

    // Send a detailed error response
    res.status(500).json({
      message: "Unable to fetch data",
      error: error.message, // Include error message for debugging
    });
  }
};


exports.getUserId = async (req, res) => {
    const { user_id } = req.params; // Get user_id from request parameters
    try {
        // Find a single user by _id
        const singleUser = await User.findOne({ _id: user_id });
        // If the user is not found, send a 404 error with a message
        if (!singleUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // If user is found, return the user details in the response
        res.status(200).json(singleUser);
    } catch (error) {
        // If there was an error during the database operation, send a 500 error
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


exports.changePassword = async (req, res) => {
  const { id } = req.params; // Get user id from URL parameters
  const { old_password, new_password } = req.body;
  try {
    // Find the user by user_id
    const user = await User.findOne({ _id: id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the old password with the stored password
    const isMatch = await bcrypt.compare(old_password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    // Optional: You can validate the new password (e.g., check length or complexity) here
    if (new_password.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_password, 10); // 10 is the salt rounds

    // Save the new hashed password to the user's record
    user.password = hashedPassword;
    await user.save();

    // Send success response
    return res.status(200).json({ message: 'Password successfully changed' });
    
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.Test=async(req,res)=>{
  try{
    const list = await User.find({
      first_name: "Noorbasha",
      last_name: "subhani",
      status: { $ne: "P" }
    });
    res.status(200).json({message:"success",data:list});
  }catch(error){
    res.status(500).json({message:"eroor",error});
  }
}


exports.updateUser = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const { row_id } = req.params;

  try {
    // Update user by their row_id
    const updatedUser = await User.findByIdAndUpdate(
      row_id,
      { first_name, last_name, email },
      { new: true }  // This will return the updated document
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user data
    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    // Handle any error
    res.status(500).json({
      message: "Error updating user profile",
      error: error.message
    });
  }
};


exports.employeeRegistartions = async (req, res) => {
  const {
    first_name, last_name, email, password, gender,
    fathername, mothername, fathername_no, mothername_no,
    date_of_birthday, mobile_no, department_id, designation_id, castname,
    address, user_type,status, pan_number, are_you_fresher, previous_company,
    previous_designation, reporting_manager_name, reporting_manager_no, from_date,
    to_date, experience_details, heigher_qualification, qualification_year,
    pecentage, institute_name, google_link, bank_name, branch_name, bank_ac_number, ifc_no,
    ref_no_one, ref_no_two, ref_mobile_one, ref_mobile_two,password_visible
  } = req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Fetch the last user to generate a dynamic Empcode
    const latestUser = await User.findOne().sort({ employee_id: -1 }); // Sort by employee_id in descending order
    let newEmpcode;
    if (latestUser) {
      // If there are users, generate the next Empcode by incrementing the last one
     const lastEmpcode = parseInt(latestUser.employee_id.slice(3)); // Extract number part from "EMP" prefix
     //newEmpcode = 'EMP00010';
     newEmpcode = 'EMP' + (lastEmpcode + 1).toString().padStart(4, '0'); // Generate new Empcode like EMP0001, EMP0002, etc.
    } else {
      // If there are no users, initialize the employee_id to 'EMP0001'
      newEmpcode = 'EMP0001';
    }
    // Create new user with the provided details and the dynamically generated Empcode
    const newData = new User({
      first_name, last_name, email, password: hashedPassword, gender,
      fathername, mothername, fathername_no, mothername_no,
      date_of_birthday, mobile_no, department_id, designation_id, castname,
      address, user_type,status, pan_number, are_you_fresher, previous_company,
      previous_designation, reporting_manager_name, reporting_manager_no, from_date,
      to_date, experience_details, heigher_qualification, qualification_year,
      pecentage, institute_name, google_link, bank_name, branch_name, bank_ac_number, ifc_no,
      ref_no_one, ref_no_two, ref_mobile_one, ref_mobile_two,password_visible:password // Assign the dynamically generated Empcode
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



exports.updateBank = async (req, res) => {
  const { bank_name, branch_name, bank_ac_number, ifsc_no } = req.body;
  const { row_id } = req.params;

  try {
    // Attempt to find and update the document
    const updatedBankDetails = await User.findByIdAndUpdate(
      row_id,
      { bank_name, branch_name, bank_ac_number, ifsc_no },
      { new: true } // To return the updated document
    );

    // Check if the bank details were found and updated
    if (!updatedBankDetails) {
      return res.status(404).json({
        message: "Bank details not found",
      });
    }

    // Return success response with updated data
    res.status(200).json({
      message: "Bank details updated successfully",
      data: updatedBankDetails,
    });
  } catch (err) {
    // Log the error and send response
    console.error(err);  // Optional: log the error for debugging
    res.status(500).json({
      message: "Failed to update bank details",
      error: err.message || err, // Include the specific error message for debugging
    });
  }
};

exports.getbirthday=async(req,res)=>{
  try{
   const getbirth=await User.find()
     .populate('department_id', 'name')     // assuming 'name' is the field you want from Department
     .populate('designation_id', 'name');
     
   res.status(200).json({message:"success",data:getbirth});
  }catch(err){
    console.log(err.message);
  }
}
exports.delUser = async (req, res) => {
  try {
    const { row_id } = req.params;  // Assuming the user ID is passed in the route parameter
    // Find and delete the user by ID
    const getbirth = await User.findByIdAndDelete(row_id);
    if (!getbirth) {
      return res.status(404).json({ message: "User not found" });
    }
    // Send the success response
    res.status(200).json({ message: "User deleted successfully", data: getbirth });
  } catch (err) {
    console.error(err.message);
    // Send the error response
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.Pending_list=async(req,res)=>{
  try{
    const list = await User.find({
      status: "P"
    });
    res.status(200).json({message:"success",data:list});
  }catch(error){
    res.status(500).json({message:"eroor",error});
  }
}



exports.emailCheck = async (req, res) => {
  const { email } = req.params;
  try {
    // Find users that match the provided email
    const list = await User.find({ email: email });

    if (list.length > 0) {
      // Email exists in the database
      return res.status(200).json({ message: "Email already exists" });
    } else {
      // Email is available (not found in the database)
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (err) {
    // Handle any errors during the database operation
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.partnerList=async(req,res)=>{
  try{
    const list = await User.find({
      status:  { $ne: "P" }
    });
    res.status(200).json({message:"success",data:list});
  }catch(error){
    res.status(500).json({message:"eroor",error});
  }
}