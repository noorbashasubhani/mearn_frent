// userController.js

const User = require('../models/User'); // Assuming the User model is defined here
const jwt = require('jsonwebtoken');  
const bcrypt = require('bcryptjs');
const Department=require('../models/Department');
const Attendance = require('../models/Attendance');
//const Incentive=rquire('../models/Incentive.js');
const Incentives=require('../models/Incentive');



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
    const list = await User.find().
    populate('designation_id','name').
    populate('department_id', 'name');
    res.status(200).json({
      message: "Success",
      data: list, // Include error message for debugging
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
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
        const singleUser = await User.findOne({ _id: user_id }).
        populate('designation_id','name').
        populate('department_id', 'name');
        // If the user is not found, send a 404 error with a message
        if (!singleUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // If user is found, return the user details in the response
        res.status(200).json({data:singleUser});
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
    //const latestUser = await User.findOne().sort({ employee_id: -1 }); // Sort by employee_id in descending order

    const latestUser = await User.findOne({ employee_id: { $exists: true, $ne: "" } }).sort({ employee_id: -1 });


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
      first_name, last_name, email, password: hashedPassword, gender,code:newEmpcode,
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

exports.updateEmployees = async (req, res) => {
  
  const { row_id } = req.params; // Get employee ID from route
   const UPDS = { ...req.body };
  try {
   // const user = await User.findById(row_id);
    //if (!user) {return res.status(404).json({ message: 'User not found' });}
    const updatedUser = await User.findByIdAndUpdate(row_id,UPDS,{ new: true });
    res.status(200).json({message: 'Employee updated successfully!',user: updatedUser});
  } catch (error) {
    res.status(500).json({message: 'Failed to update employee',error: error.message});
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
      user_type:  'P'
    });
    res.status(200).json({message:"success",data:list});
  }catch(error){
    res.status(500).json({message:"eroor",error});
  }
}




exports.getPayrollData = async (req, res) => {
  try {
    const { month } = req.params;
    const [year, rawMonth] = month.split('-');
    const monthIndex = parseInt(rawMonth, 10);

    const total_month_days = new Date(year, monthIndex, 0).getDate();
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 1);
    const month_year = `${year}-${rawMonth}`; // e.g. "2025-06"

    const users = await User.find();

    const data = await Promise.all(users.map(async user => {
      const attendanceRecords = await Attendance.find({
        user_id: user._id,
        date: { $gte: startDate, $lt: endDate }
      });

      let countP = 0, countC = 0, countH = 0, countL = 0, countO = 0;

      attendanceRecords.forEach(rec => {
        switch (rec.attendance_status) {
          case 'P': countP++; break;
          case 'C': countC++; break;
          case 'H': countH++; break;
          case 'L': countL++; break;
          case 'O': countO++; break;
        }
      });

      const countA = total_month_days - (countP + countC + countH + countL + countO);
      const working_days = countP + countC + (countH * 0.5) + countO;
      const unpaid_days = countH * 0.5 + countL;

      const annual_salary = user.salary || 0;
      const monthly_salary = annual_salary / 12;
      const ctc_per_day = +(monthly_salary / total_month_days).toFixed(2);
      const present_salary = +(working_days * ctc_per_day).toFixed(2);

      // Default values
      let prof_tax = 0;
      if (monthly_salary > 20000) prof_tax = 200;
      else if (monthly_salary > 15000) prof_tax = 150;

      let advance = 0;
      let pf_deduction = 0;
      let other_deduction = 0;
      let incentives = 0;
      let accident_insurance = 0;
      let payslop_status = 'Pending';

      // ✅ Fetch Incentive data if exists
      const incentive = await Incentives.findOne({ emp_id: user._id, month_year });

      if (incentive) {
        advance = incentive.advance || 0;
        pf_deduction = incentive.pf_deduction || 0;
        other_deduction = incentive.other_deduction || 0;
        incentives = incentive.incentives || 0;
        accident_insurance = incentive.accident_insurance || 0;
        prof_tax = incentive.prof_tax || prof_tax; // override default if provided
        payslop_status = incentive.payslop_status || 'Pending';
        ins_id=incentive._id;
        issuanceDate=incentive.issuanceDate;
        modeOfPay=incentive.modeOfPay;
        finaly_paid=incentive.finaly_paid;
        payslop_status=incentive.payslop_status;
      }

      const final_pay = +(
        present_salary - prof_tax - advance - pf_deduction - other_deduction + incentives + accident_insurance
      ).toFixed(2);

      return {
        name: `${user.first_name} ${user.last_name}`,
        emp_id: user._id,
        total_days: total_month_days,
        count_present: countP,
        count_casual: countC,
        count_halfday: countH,
        count_lop: countL,
        count_holiday: countO,
        count_absent: countA,
        working_days,
        ctc_per_day,
        ctc_per_month: +monthly_salary.toFixed(2),
        present_salary,
        prof_tax,
        advance,
        pf_deduction,
        other_deduction,
        incentives,
        accident_insurance,
        final_pay,
        paid_leave: working_days,
        unpaid_leave: unpaid_days,
        payslop_status,
        insent_id:ins_id,
        issuanceDate:issuanceDate,
        modeOfPay:modeOfPay,
        payslop_status:payslop_status,
        finaly_paid:finaly_paid
      };
    }));

    res.json({ success: true, data });

  } catch (error) {
    console.error('Payroll error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



exports.addInsentives = async (req, res) => {
  const emp_id = req.params.id;
  const {
    incentives,
    advance,
    other_deduction,
    pf_deduction,
    prof_tax,
    accident_insurance,
    month_year
  } = req.body;

  try {
    // Check if record already exists for that emp_id and month_year
    let record = await Incentives.findOne({ emp_id, month_year });

    if (record) {
      // Update existing record
      record.incentives = incentives || 0;
      record.advance = advance || 0;
      record.other_deduction = other_deduction || 0;
      record.pf_deduction = pf_deduction || 0;
      record.prof_tax = prof_tax || 0;
      record.accident_insurance = accident_insurance || 0;

      await record.save();
      return res.json({ success: true, message: 'Incentive updated successfully', data: record });
    }

    // Create new incentive record
    const newRecord = new Incentives({
      emp_id,
      month_year,
      incentives: incentives || 0,
      advance: advance || 0,
      other_deduction: other_deduction || 0,
      pf_deduction: pf_deduction || 0,
      prof_tax: prof_tax || 0,
      accident_insurance: accident_insurance || 0,
      payslop_status: 'Pending'
    });

    await newRecord.save();
    return res.json({ success: true, message: 'Incentive added successfully', data: newRecord });

  } catch (error) {
    console.error('Error saving incentive:', error);
    return res.status(500).json({ success: false, message: 'Server error while saving incentive' });
  }
};


exports.getInsentive = async (req, res) => {
  try {
    const { month_year } = req.params;

    let query = {};
    if (month_year) {
      query.month_year = month_year; // filter by month if provided
    }

    const data = await Incentives.find(query)
      .populate('emp_id', 'name email') // populate employee info
      .sort({ created_at: -1 }); // optional: latest first

    res.json({ success: true, data });
  } catch (err) {
    console.error('Error fetching incentives:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.approveIncentive = async (req, res) => {
 try {
    const { id } = req.params;
    const update = {
      issuanceDate: req.body.issuanceDate,
      modeOfPay: req.body.modeOfPay,
      finaly_paid: req.body.final_pay,
      payslop_status: req.body.payslop_status
    };

    const updated = await Incentives.findByIdAndUpdate(id, update, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: 'Incentive not found' });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.registerPartner = async (req, res) => {
  try {
    const {
      first_name, last_name, email, password,
      gender, date_of_birthday, mobile_no,
      pan_number, bank_name, branch_name, bank_ac_number, ifsc_no,
      ref_no_one, ref_no_two, ref_mobile_one, ref_mobile_two, partner_type,user_type,status
    } = req.body;

    // Email duplication check
    const existingPartner = await User.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new User({
      first_name, last_name, email,
      password: hashedPassword,
      gender, date_of_birthday, mobile_no,
      pan_number, bank_name, branch_name, bank_ac_number, ifsc_no,
      ref_no_one, ref_no_two, ref_mobile_one, ref_mobile_two, partner_type,user_type:'P',status:'P'
    });

    await newPartner.save();

    res.status(201).json({ message: 'Partner registered successfully', partner_id: newPartner._id });
  } catch (error) {
    console.error('Error in registerPartner:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.fetchPartners=async(req,res)=>{
   try{
    const getData=await User.find({status:'P',user_type:'P'});
 res.status(200).json({ message: 'Partner registered successfully', data: getData });
   }catch(err){
 res.status(500).json({ message: 'Server error' });
   }
}
