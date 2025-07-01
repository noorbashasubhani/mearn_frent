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


exports.updateStausApprove = async (req, res) => {
  try {
    const {
      doc_id,
      sup_status,
      sup_approved_by,
      supper_partner_id,
      supper_partner_percentage,
      sales_status,
      partner_approved_by,
      sales_partner_id,
      sales_partner_percentage,
      lead_status,
      lead_approved_by,
      lead_partner_id,
      lead_partner_percentage
    } = req.body;

    const updateData = {};

    if (sup_status) {
      updateData.sup_status = sup_status;
      updateData.sup_approved_by = sup_approved_by;
      updateData.supper_partner_id = supper_partner_id;
      updateData.supper_partner_percentage = supper_partner_percentage;
    }

    if (sales_status) {
      updateData.sales_status = sales_status;
      updateData.partner_approved_by = partner_approved_by;
      updateData.sales_partner_id = sales_partner_id;
      updateData.sales_partner_percentage = sales_partner_percentage;
    }

    if (lead_status) {
      updateData.lead_status = lead_status;
      updateData.lead_approved_by = lead_approved_by;
      updateData.lead_partner_id = lead_partner_id;
      updateData.lead_partner_percentage = lead_partner_percentage;
    }

    const updated = await Calculation.findOneAndUpdate(
      { doc_id },        // 🔁 Match by doc_id
      { $set: updateData, doc_id }, // ensure doc_id is included in insert
      { new: true, upsert: true }   // ✅ upsert: create if not exists
    );

    res.json({ message: 'Calculation approved/created successfully', data: updated });
  } catch (err) {
    console.error('Approval update failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getRecentBusiness = async (req, res) => {
  try {
    const { partnerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({ message: 'Invalid partner ID' });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const result = await Calculation.aggregate([
      {
        $match: {
          $or: [
            { super_partner_id: new mongoose.Types.ObjectId(partnerId) },
            { sales_partner_id: new mongoose.Types.ObjectId(partnerId) },
            { lead_partner_id: new mongoose.Types.ObjectId(partnerId) }
          ]
        }
      },
      {
        $facet: {
          total_business: [
            {
              $group: {
                _id: null,
                total: { $sum: '$total_package_cost_quoted' },
                last_sale_date: { $max: '$createdAt' }
              }
            }
          ],
          recent_business: [
            {
              $match: {
                createdAt: { $gte: startOfMonth, $lte: endOfMonth }
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: '$total_package_cost_quoted' }
              }
            }
          ]
        }
      },
      {
        $project: {
          total_business: { $arrayElemAt: ['$total_business.total', 0] },
          last_sale_date: { $arrayElemAt: ['$total_business.last_sale_date', 0] },
          recent_business: { $ifNull: [{ $arrayElemAt: ['$recent_business.total', 0] }, 0] }
        }
      }
    ]);

    const data = result[0] || {
      total_business: 0,
      recent_business: 0,
      last_sale_date: null
    };

    res.status(200).json({ message: 'Success', data });
  } catch (err) {
    console.error('Error in getRecentBusiness:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPendingPercentage = async (req, res) => {
  try {
    const data = await Calculation.find({
      $or: [
        { sup_status: 'S' },
        { sales_status: 'S' },
        { lead_status: 'S' }
      ]
    })
    .populate({
      path: 'doc_id',
      select: 'customer_name holiday_destination ghrn_no operation_executive',
      populate: [
        {
          path: 'holiday_destination',
          select: 'destination_name'
        },
        {
          path: 'operation_executive',
          select: 'first_name last_name'
        }
      ]
    })
    .populate({ path: 'supper_partner_id', select: 'first_name last_name' })
    .populate({ path: 'sales_partner_id', select: 'first_name last_name' })
    .populate({ path: 'lead_partner_id', select: 'first_name last_name' })
    .populate({ path: 'sup_approved_by', select: 'first_name last_name' })
    .populate({ path: 'partner_approved_by', select: 'first_name last_name' })
    .populate({ path: 'lead_approved_by', select: 'first_name last_name' });

    res.status(200).json({ message: 'Success', data });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.approvePartnerStatus = async (req, res) => {
   try {
    const { doc_id, sup_status, sup_approved_by, sales_status, partner_approved_by, lead_status, lead_approved_by } = req.body;

    if (!doc_id) {
      return res.status(400).json({ message: 'doc_id is required' });
    }

    const updateFields = {};

    if (sup_status === 'A' && sup_approved_by) {
      updateFields.sup_status = 'A';
      updateFields.sup_approved_by = sup_approved_by;
    }

    if (sales_status === 'A' && partner_approved_by) {
      updateFields.sales_status = 'A';
      updateFields.partner_approved_by = partner_approved_by;
    }

    if (lead_status === 'A' && lead_approved_by) {
      updateFields.lead_status = 'A';
      updateFields.lead_approved_by = lead_approved_by;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid approval data provided' });
    }

    const result = await Calculation.updateOne(
      { doc_id },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'No record updated or already approved' });
    }

    res.status(200).json({ message: 'Approval status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
