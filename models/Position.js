const mongoose = require("mongoose");

const jobPostingSchema = mongoose.Schema({
    department_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department'
    },
    role: {
        type: String
    },
    designation_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Designation'
    },
    candidate_type: { 
        type: String
    },
    no_of_candidates: {
        type: Number,
        default: 1
    },
    job_desc: {
        type: [String]
    },
    role_and_responces: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    experience: {
        type: Number
    },
    relevant_exp: {
        type: String
    },
    employee_type: {
        type: String
    },
    education: {
        type: String
    },
    job_location: {
        type: String
    },
    language: {
        type: [String]
    },
    salaryrange_from: {
        type: Number
    },
    salaryrange_to: {
        type: Number
    },
    gender: {
        type: String,
    },
    application_dead_line: {
        type: Date
    },
    status: {
        type: String,  // e.g., "Open", "Closed"
    },
    closed_date:{
      type:Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,  // This will likely be the user ID of the person who created the job posting
        ref:'User'
    }
},{
    timestamps:true
});

// Create the model and export it
const Position = mongoose.model('Position', jobPostingSchema);

module.exports = Position;
