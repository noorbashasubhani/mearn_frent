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
        { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
      );


      // Login successful - send success message
      res.status(200).json({ message: "User Login successful",token: token });

  } catch (error) {
      console.error("Login error:", error); // Log error for debugging purposes
      res.status(400).json({ message: "Something went wrong" });
  }
};
