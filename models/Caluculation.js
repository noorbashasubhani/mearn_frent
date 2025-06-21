const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  land_cost: Number,
  loading_percentage_on_land: Number,
  loading_amount_on_land: Number,
  cost_to_company: Number,
  supper_partner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  supper_partner_percentage: Number,
  supper_partner_percentage_amount: Number,
  sales_partner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sales_partner_percentage: Number,
  sales_partner_percentage_amount: Number,
  lead_partner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lead_partner_percentage: Number,
  lead_partner_percentage_amount: Number,
  total_partners_percentage: Number,
  total_partners_percentage_amount: Number,
  cost_to_be_sold: Number,
  goods_tax_percentage: Number,
  goods_tax_amount: Number,
  goods_tax_amount_after_land: Number,
  flight_cost_share: Number,
  flight_cost_percentage: Number,
  flight_cost_amount: Number,
  travel_insurance: Number,
  total_flight_cost: Number,
  cruise_cost: Number,
  loading_on_cruise_percentage: Number,
  loading_on_cruise_amount: Number,
  supper_agent_commission: Number,
  sales_agent_commission: Number,
  lead_agent_commission: Number,
  total_agent_commission_amount: Number,
  cruise_amount_after_loading: Number,
  total_package_cost: Number, // Keep only one
  sup_charges: Number,
  train_charges: Number,
  bus_charges: Number,
  total_package_cost_quoted: Number, // Keep only one
  no_of_packs: Number,
  package_cost_for_flight: Number,
  land_cost_per_person: Number,
  flight_cost_per_person: Number,
  cruise_cost_per_person: Number,
  train_cost_per_person: Number,
  bus_cost_per_person: Number,
  ramittance:Number,
  total_cost_remittance:Number,
  visa_cost:Number,
  travel_insurance:Number,
  total_tcs_cost:Number,
  show_single_cost_in_itenary: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  doc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }
}, { timestamps: true });


const Calculation = mongoose.model("Calculation", calculationSchema);
module.exports = Calculation;


