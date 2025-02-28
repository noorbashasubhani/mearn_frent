const Position = require('../models/Position');  // Import the schema

exports.addJobPosting = async (req, res) => {
    const { 
        department_name, role, designation_name, candidate_type, 
        no_of_candidates, job_desc, role_and_responces, skills, 
        experience, relevant_exp, employee_type, education, 
        job_location, language, salaryrange_from, salaryrange_to, 
        gender, application_dead_line
    } = req.body;
    const {user_id}=req.params;

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
            created_by : user_id// This should be the user ID
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
        const list =await Position.find();
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