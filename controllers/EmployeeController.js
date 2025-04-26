const Employee = require('../models/Employee');

const Project=require("../models/Project");



exports.createEmployees = async (req, res) => {
  const { name, email, designation } = req.body;
  const addedby = req.user.userId;
  try {
    const emp = new Employee({
      name,
      email,
      designation,
      added_by: addedby,
    });

    const savedEmployee = await emp.save();
    res.status(200).json({ message: 'Employee saved successfully', data: savedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error while saving', error: error.message });
  }
};


exports.addProject=async(req,res)=>{
  
   const {project_name,employeeids}=req.body;
   const addedby = req.user.userId;

   try{
    const pro=new Project({
      project_name,
      employeeids,
      added_by:addedby
    });
    const savedProj = await pro.save();
    res.status(200).json({ message: 'Employee saved successfully', data: savedProj });
   }catch (error) {
    res.status(500).json({ message: 'Error while saving', error: error.message });
  }

}

exports.getEmpl = async (req, res) => {
  try {
    const emps = await Employee.find();
     
    res.status(200).json({ message: 'Projects fetched successfully', data: emps });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching projects', error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('employeeids', 'name email designation') // only select needed fields
      .populate('added_by', 'first_name last_name email'); // assuming User has name and email

    res.status(200).json({ message: 'Projects fetched successfully', data: projects });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching projects', error: error.message });
  }
};

