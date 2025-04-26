const Position = require('../models/Position');  // Import the schema
const Department=require('../models/Department');

exports.addJobPosting = async (req, res) => {
    const { 
        department_name, role, designation_name, candidate_type, 
        no_of_candidates, job_desc, role_and_responces, skills, 
        experience, relevant_exp, employee_type, education, 
        job_location, language, salaryrange_from, salaryrange_to, 
        gender, application_dead_line
    } = req.body;
    //const {user_id}=req.user.user_id;
    const user_id = req.user.userId;
    try {
        const newJobPosting = new Position({
            department_name,
            role,
            designation_name,
            candidate_type,
            no_of_candidates,
            job_desc,
            role_and_responces,
            skills,
            experience,
            relevant_exp,
            employee_type,
            education,
            job_location,
            language,
            salaryrange_from,
            salaryrange_to,
            gender,
            application_dead_line,
            created_by : user_id,
            status:"Pending"
        });

        const savedJob = await newJobPosting.save();

        res.status(200).json({
            message: "Job Posting added successfully",
            data: savedJob
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add job posting",
            error: error.message
        });
    }
};


exports.GetAllJobs = async(req,res) => {
    try{
        const list =await Position.find()
        .populate('department_name', 'name')     // assuming 'name' is the field you want from Department
        .populate('designation_name', 'name')
        .populate('created_by', 'first_name , last_name');  // assuming 'title' is the field you want from Designation;
        res.status(200).json({message:"success",data:list});
    }catch(error){
      res.status(500).json({message:"failed",error});
    }
}

exports.GetSingleJobs = async(req,res) => {
    const {row_id} = req.params;
    try{
        const list =await Position.findOne({_id:row_id});
        res.status(200).json({message:"success",data:list});
    }catch(error){
      res.status(500).json({message:"failed",error});
    }
}

exports.closePosition=async(req,res)=>{
    const {row_id} = req.params;
    
    try{
        const list =await Position.findByIdAndUpdate(row_id,{status:"Closed",closed_date: new Date() },{new:true});
        res.status(200).json({message:"success"});
    }catch(error){
      res.status(500).json({message:"failed",error});
    }
};

exports.DeletePosition=async(req,res)=>{
    const {row_id} = req.params;
    try{
        const list =await Position.findByIdAndUpdate(row_id,{status:"Delete"},{new:true});
        res.status(200).json({message:"success"});
    }catch(error){
      res.status(500).json({message:"failed",error});
    }
};
