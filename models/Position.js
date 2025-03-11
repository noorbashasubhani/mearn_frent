const mongoose = require("mongoose");

const jobPostingSchema = mongoose.Schema({
    department_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    designation_name: {
        type: String,
        required: true
    },
    candidate_type: { 
        type: String, 
        required: true, // e.g., "Full-time", "Part-time", "Intern"
    },
    no_of_candidates: {
        type: Number,
        required: true,
        default: 1
    },
    job_desc: {
        type: String,
        required: true
    },
    role_and_responces: {
        type: String,
        required: true
    },
    skills: {
        type: [String],  // Array of strings to store multiple skills
        required: true
    },
    experience: {
        type: Number,  // Total experience required for the role (in years)
        required: true
    },
    relevant_exp: {
        type: Number,  // Relevant experience (in years)
        required: true
    },
    employee_type: {
        type: String, // Full-time, part-time, contract, etc.
        required: true
    },
    education: {
        type: String,  // Educational qualifications required for the role
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    language: {
        type: [String],  // Languages required for the role
        required: true
    },
    salaryrange_from: {
        type: Number,  // Minimum salary
        required: true
    },
    salaryrange_to: {
        type: Number,  // Maximum salary
        required: true
    },
    gender: {
        type: String,
    },
    application_dead_line: {
        type: Date,  // Deadline for applying
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,  // e.g., "Open", "Closed"
    },
    created_by: {
        type: String,  // This will likely be the user ID of the person who created the job posting
        required: true
    }
});

// Create the model and export it
const Position = mongoose.model('Position', jobPostingSchema);

module.exports = Position;
