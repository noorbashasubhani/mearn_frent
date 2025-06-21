const Designation = require("../models/Designation");
const Department = require("../models/Department");
const mongoose = require('mongoose');

exports.addDesignation = async (req, res) => {
    // Log the incoming request body
    const { name, department } = req.body;
    try {
        const designation = new Designation({
            name: name,
            department: department,  // Associate with the department's ObjectId
        });
        // Save the new designation
        await designation.save();
        // Return the success response with the created designation
        res.status(200).json({
            message: "Designation added successfully",
            data:designation,
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
      .populate("department", "name") // Populate 'department' field with 'name' of 
       .sort({ _id: -1 })  
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


exports.getGroupDesignations = async (req, res) => {
  try {
    // Fetch all designations and populate the 'department' field with the department's name
    const designations = await Designation.find()
      .populate("department", "name") // Populates the 'department' field with only the 'name'
      .exec();

    // Group by department
    const groupedDesignations = designations.reduce((acc, designation) => {
      // Extract department name
      const departmentName = designation.department.name;

      // If the department doesn't exist in the accumulator, create an array for it
      if (!acc[departmentName]) {
        acc[departmentName] = [];
      }

      // Add the designation to the corresponding department
      acc[departmentName].push({
        _id: designation._id,
        name: designation.name,
      });

      return acc;
    }, {});

    // Send the grouped designations as a response
    res.status(200).json(groupedDesignations);

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching the designations",
      error: error.message,
    });
  }
};


exports.deleteDesingnation = async (req, res) => {
  const { row_id } = req.params; // ✅ Fixed from request.params to req.params

  try {
    const resData = await Designation.findByIdAndDelete(row_id);

    if (!resData) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    res.status(200).json({ message: 'Deleted successfully', data: resData });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
