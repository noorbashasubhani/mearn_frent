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
      res.status(200).json({ message: "User Login successful",token: user });

  } catch (error) {
      console.error("Login error:", error); // Log error for debugging purposes
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

