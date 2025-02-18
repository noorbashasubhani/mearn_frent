const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    first_name : {
        type : String,
        required:true,
    },
    last_name : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique:true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    password : {
        type : String,
        required:true
    },
});
const User = mongoose.model("User",userSchema);
module.exports = User;