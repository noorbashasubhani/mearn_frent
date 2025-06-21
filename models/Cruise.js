const mongoose=require('mongoose');

const cruiseSchema=new mongoose.Schema({
    cruise_supp:{type:String},
    cruise_name:{type:String},
    contact_person:{type:String},
    contact_number:{type:Number},
    start_date:{type:Date},
    end_date:{type:Date},
    start_city:{type:String},
    end_city:{type:String},
    cabin_type:{type:String},
    meal_plan:{type:String},
    no_of_ninghts:{type:String},
    no_of_adults:{type:Number},
    no_of_children:{type:Number},
    selling_cities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }],
    no_of_cabin:{type:Number},
    total_cost:{type:Number},
    doc_id:{type:mongoose.Schema.Types.ObjectId,
        ref:'Lead'
    }
},{
    timestamps:true
});

const Cruise=mongoose.model("Cruise",cruiseSchema);
module.exports=Cruise;
