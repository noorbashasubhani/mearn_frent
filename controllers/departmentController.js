const Department = require("../models/Department");

exports.addDepartment = async(req,res)=>{
  const {name} = req.body;
  //console.log(name);
  if(!name){
    return res.status(5000).json({message:"Department Name is Required"});
  }

  try{
    const department = new Department({ name });
    await department.save();
    
      res.status(200).json({message:"Departments Added Successfully",department});
    } catch( error ){
      res.status(500).json({message:"something went wrong"});
    }
};


exports.getDepartments=async(req,res)=>{
  try{
     const list = await Department.find();
     res.status(200).json(list);
  }catch(error){
    res.status(500).json({message:"Data not getting now"});
  }
};




  