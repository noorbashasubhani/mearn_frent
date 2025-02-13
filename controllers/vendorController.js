const Vendor = require('../models/Vendor'); // Import the Vendor model
const jwt = require('jsonwebtoken');  
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing
// Create a new Vendor
const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({email});
        // Check if the email already exists in the database
        //const existingVendor = await Vendor.findOne({ email });
        if (vendorEmail) {
             res.status(400).json('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        // Create a new Vendor document
        const newVendor = new Vendor({
            username,
            email,
            password : hashedPassword
        });
        // Save the new Vendor document to the database
        await newVendor.save();
        // Return a success response
         res.status(201).json({
            message: 'Vendor created successfully',
            data: newVendor
        });
        console.log('Registered successfully nbs');
    } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'INternal Server error' });
    }
}




const vendorLogin = async (req, res) => {
   const {email,password}=req.body;
   try{
   const vendor = await Vendor.findOne({email});
   if(!vendor || !(await bcrypt.compare(password,vendor.password))){
      return res.status(401).json({error:'Invalid Email or Password'});
   }else{
      res.status(200).json({success:'Login success'});
   }
   }catch(error){
    console.error(error);
    res.status(500).json({ error: 'INternal Server error' });
   }
}

module.exports = { vendorRegister,vendorLogin }