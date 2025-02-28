const mongoose = require("mongoose");

const ReferenceSchema = mongoose.Schema({
    first_ref:{
        type:String
    },
    first_ref_no:{
        type:String
    },
    second_ref:{
        type:String
    },
    second_ref_no:{
        type:String,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Reference = mongoose.model('Reference', ReferenceSchema);
module.exports = Reference;