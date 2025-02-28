const mongoose = require("mongoose");
const ripSchema = mongoose.Schema({
    employee_name: {
        type: String,
        required: true  // Making employee_name required
    },
    visible_to: {
        type: [String],
        required: true  // Ensuring visibility is required
    },
    from_to_date: {
        type: {
            from: {
                type: Date,
                required: true  // Making the 'from' date required
            },
            to: {
                type: Date,
                required: true  // Making the 'to' date required
            },
        },
        required: true  // Ensuring from_to_date is required
    },
    no_of_confirmations: {
        type: Number,  // Changed to Number instead of String
        default: 0,    // Default value of 0 if not provided
    },
    total_volume: {
        type: Number,
        required: true,  // Assuming total_volume is required for the record
    },
    status:{
        type:String
    },
    created_by:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

// Create the model and export it
const Rip = mongoose.model('Rip', ripSchema);
module.exports = Rip;
