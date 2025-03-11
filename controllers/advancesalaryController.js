const Advancesalary = require("../models/Advancesalary");

exports.addSalary = async (req, res) => {
    const { amount, managers_names } = req.body;
    const { user_id } = req.params;

    // Log the received data
    console.log("Received managers_names:", managers_names);

    try {
        // Create a new advance salary record
        const newData = new Advancesalary({
            amount,
            managers_names,
            added_by: user_id,
            status: "Y"
        });

        // Save the new data to the database
        const list = await newData.save();

        // Respond with success message and the saved data
        res.status(200).json({
            message: "success",
            data: list
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Respond with a failure message and status 500
        res.status(500).json({
            message: "failed",
            error: error.message  // Send the error message for debugging
        });
    }
};

exports.getSalarydetails=async(req,res)=>{
    try{
        const list = await Advancesalary.find();
        res.status(200).json({message:"success",data:list});
    }catch(error){
        res.status(500).json({message:"failed"});
    }
}