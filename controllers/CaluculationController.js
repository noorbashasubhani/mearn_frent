const Calculation = require('../models/Caluculation');
const mongoose = require('mongoose');


exports.addCalculation = async (req, res) => {
  const { row_id } = req.params;
const form = req.body;
  try {
    if (!row_id || row_id.trim() === '') {
      alert("Invalid row ID — cannot save calculation.");
      return;
    }

    const cleanObjectId = (val) => {
      return val && typeof val === 'string' && val.trim() !== '' ? val : null;
    };

    const dataToSend = {
      ...form,
      supper_partner_id: cleanObjectId(form.supper_partner_id),
      sales_partner_id: cleanObjectId(form.sales_partner_id),
      lead_partner_id: cleanObjectId(form.lead_partner_id),
    };

    const calData = await fetch(`${API_URL}/vendor/Cal/${row_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const list = await calData.json();
    res.status(200).json({message: "Calculation created successfully",list});
  } catch (err) {
     res.status(500).json({message: "Failed to create calculation",error: err.message});
  }
};



exports.getCal=async(req,res)=>{
   try{
    const list=await Calculation.find();
    res.status(200).json({message: "Calculation created successfully",list});
   }catch(err){
     res.status(500).json({message: "Failed to create calculation",error: err.message});
   }
}


exports.getCalSingle=async(req,res)=>{
  const {doc_id}=req.params;
   try{
    const list=await Calculation.findOne({doc_id:doc_id});
    res.status(200).json({message: "Calculation created successfully",list});
   }catch(err){
     res.status(500).json({message: "Failed to create calculation",error: err.message});
   }
}

exports.updateCal = async (req, res) => {
  const { doc_id } = req.params;
  const newData = req.body;

  try {
    if (!doc_id) {
      return res.status(400).json({ message: "Missing document ID (doc_id)" });
    }

    // Update the document where doc_id matches
    const updatedCal = await Calculation.findOneAndUpdate(
      { doc_id: doc_id }, // query filter by doc_id field
      newData,
      { new: true } // return the updated document
    );

    if (!updatedCal) {
      return res.status(404).json({ message: "Calculation not found with the provided doc_id" });
    }

    return res.status(200).json({
      message: "Calculation updated successfully",
      list: updatedCal,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update calculation",
      error: err.message,
    });
  }
};


exports.createOrUpdateCal = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const existing = await Calculation.findOne({ doc_id: id });

    if (existing) {
      const updated = await Calculation.findOneAndUpdate(
        { doc_id: id },
        newData,
        { new: true }
      );
      return res.status(200).json({ message: 'Updated', list: updated });
    } else {
      const created = await Calculation.create({ ...newData, doc_id: id });
      return res.status(201).json({ message: 'Created', list: created });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error', error: err.message });
  }
};
