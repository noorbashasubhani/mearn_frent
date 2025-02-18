const User = require("../models/User");

exports.AddUser = async (req,res) => {
  const {first_name,last_name,email,password} = req.body;
  try{
    const newUser = new User({
        first_name,
        last_name,
        email,
        password,
      });
    await newUser.save();
    res.status(200).json({message:"User Details Added Successfully"});
  }catch(error){
   res.status(500).json({message:"Something went Wrong"})
  }
}

exports.userChecking = async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await User.findOne({ email,pass });
      res.status(200).json({ message: "User authenticated successfully" });
  
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };