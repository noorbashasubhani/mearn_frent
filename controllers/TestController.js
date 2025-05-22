const Test = require("../models/Test"); // Adjust path if needed








// Create a new employee
const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json({ message: "Employee created successfully", data: test });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};












// Get all employees
const getAllTests = async (req, res) => {
    try {

        const tests = await Test.find({
          $or:[
            {salary:{$gt:5000,$lt:50000}},
            {department:'IT'},
            {department:'HR'}
          ]
        })

        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};




















// Get a single employee by ID
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// Update an employee
const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee updated", data: test });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};

// Delete an employee
const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};

module.exports = {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
};
