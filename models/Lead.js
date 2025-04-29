const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String
    },
    customer_number: {
      type: String
    },
    customer_email: {
      type: String
    },
    holiday_type: {
      type: String
    },
    holiday_desc: {
      type: String,
    },
    lead_location: {
      type: String,
    },
    lead_source: {
      type: String,
    },
    raised_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    operation_executive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    my_operation_executive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    previous_operation_executive: {
      type: mongoose.Schema.Types.ObjectId
    },
    reason:{
     type:String
    },
    partner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    package_type:{
      type:String
    },
    customer_type:{
      type:String
    },
    preferred_time:{
      type:String
    },
    customer_location:{
      type:String
    },
    start_city:{
      type:String
    },
    holiday_destination:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination', // Or 'Partner' if this is a reference to a Partner model
    },visiting_city:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination', // Or 'Partner' if this is a reference to a Partner model
    }],
    start_date:{
      type:String
    },
    end_date:{
      type:String
    },duration:{
      type:String
    },
    no_of_adults:{
      type:String
    },
    no_of_children:{
      type:String
    },
    no_of_infants:{
      type:String
    },
    no_of_pax:{
      type:String
    },
    transformation_mode:{
      type:String
    },
    trans_from_city:{
      type:String
    },
    trans_to_city:{
      type:String
    },
    hotel_standed:{
      type:String
    },
    hotel_type:{
      type:String
    },
    room_sharing_type:{
      type:String
    },
    room_prefaring:{
      type:String
    },
    no_of_rooms:{
      type:String
    },
    meals_plan:{
      type:String
    },
    food_prefaring:{
      type:String
    },
    accomdation_prefaring:{
      type:String
    },
    meals_prefaring:{
      type:String
    },
    proceesed_by:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Or 'Partner' if this is a reference to a Partner model
    },
    sight_prefaring:{
      type:String
    },
    special_includes:{
      type:String
    },budget:{
      type:String
    },
    do_you_want:{
      type:String
    },
    your_inputs:{
      type:String
    },
    executive_changed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lead_status: {
      type: String,
      default: 'L', // Default value of 'L' if not specified
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Lead', leadSchema);
