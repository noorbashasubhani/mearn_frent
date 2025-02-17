const Designation = require("../models/Designation");
const Department = require("../models/Department");
const mongoose = require('mongoose');

exports.addDesignation = async (req, res) => {
    // Log the incoming request body
    const { departmentId, designationName } = req.body;

    // Validate the inputs
    if (!departmentId || !designationName) {
        return res.status(400).json({
            message: "Department ID and Designation Name are required",
        });
    }

    try {
        // Convert departmentId to ObjectId
        const deptId = new mongoose.Types.ObjectId(departmentId);  // Ensure the correct instantiation using 'new'
        
        // Check if the department exists
        const department = await Department.findById(deptId);
        
        if (!department) {
            return res.status(404).json({
                message: "Department not found",
            });
        }

        // Create a new designation
        const designation = new Designation({
            name: designationName,
            department: deptId,  // Associate with the department's ObjectId
        });

        // Save the new designation
        await designation.save();

        // Return the success response with the created designation
        res.status(201).json({
            message: "Designation added successfully",
            designation,
        });
    } catch (error) {
        console.error("Error while adding designation:", error);
        res.status(500).json({
            message: "Something went wrong while adding the designation",
            error: error.message,
        });
    }
};


exports.getDesignations = async (req, res) => {
  try {
    // Fetch all designations and populate the 'department' field with the department's name
    const designations = await Designation.find()
      .populate("department", "name") // Populate 'department' field with 'name' of department
      .exec();

    // Return success response with populated data
    res.status(200).json({
      message: "Designations fetched successfully",
      designations,
    });
  } catch (error) {
    console.error("Error while fetching designations:", error);
    res.status(500).json({
      message: "Something went wrong while fetching the designations",
      error: error.message,
    });
  }
};