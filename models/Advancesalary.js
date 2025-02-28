const mongoose = require('mongoose');
const advanceSalarySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    managers_names: {
        type: [String],
        required: true  // Ensures that the managers_names field is required
    },
    added_by: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Y'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});


const Advancesalary = mongoose.model("Advancesalary",advanceSalarySchema); 

module.exports=Advancesalary;