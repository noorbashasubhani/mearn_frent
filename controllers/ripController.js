const Rip = require('../models/Rip');

exports.AddRip = async (req, res) => {
    const { employee_name, visible_to, from_to_date, no_of_confirmations, total_volume } = req.body;
    const  user_id  = req.user.userId;  // Get user_id from the URL params

    try {
        // Create a new Rip document
        const newData = new Rip({
            employee_name,
            visible_to,
            from_to_date,
            no_of_confirmations,
            total_volume,
            status: "Active",  // Set the status field to a string "Y"
            created_by: user_id  // Set the user_id from the request params
        });

        // Save the new Rip document to the database
        const list = await newData.save();

        // Send a success response with the saved data
        res.status(200).json({ message: "success", data: list });

    } catch (error) {
        // If there is an error, send a failure response with the error message
        console.error(error);
        res.status(500).json({ message: "Error saving Rip data", error: error.message });
    }
};

exports.getDetaRip=async(req,res)=>{
    try{
        const ripDetals= await Rip.find().populate('visible_to','first_name').populate('employee_name','first_name').populate('created_by','first_name');
    res.status(200).json({message:"success",data:ripDetals});
    }catch(error){
     res.status(500).json({message:"Failed"});
    }
}

