const Visa=require('../models/Visa');

exports.addVisa = async (req, res) => {
  const { lead_id } = req.params;
  try {
    // Attach the doc_id (lead_id) to the Visa document if needed
    const newVisa = new Visa({
      ...req.body,
      doc_id: lead_id
    });
    const savedVisa = await newVisa.save();
    res.status(200).json({ message: 'success', data: savedVisa });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error', error: err.message });
  }
};


exports.getVisa=async(req,res)=>{
 try{
     const list=await Visa.find();
     res.status(500).json({message:'success',list}); 
 }catch(err){
    res.status(500).json({message:'error'});
 }
}

exports.getVisaById = async (req, res) => {
  try {
   // const visa = await Visa.find({doc_id:req.params.id}).populate('destination_id');
    const visas = await Visa.find({ doc_id: req.params.doc_id }).populate({path:'destination_id',select:'destination_name'}).
    populate({path:'doc_id',select:'first_name'});
    if (!visas) {
      return res.status(404).json({ message: 'Visa not found' });
    }
    res.status(200).json(visas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visa', error });
  }
};

exports.updateVisa = async (req, res) => {
  try {
    const updatedVisa = await Visa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedVisa) {
      return res.status(404).json({ message: 'Visa not found' });
    }
    res.status(200).json(updatedVisa);
  } catch (error) {
    res.status(500).json({ message: 'Error updating visa', error });
  }
};


exports.addOrUpdateVisa = async (req, res) => {
  const { lead_id } = req.params;
  try {
    const updatedVisa = await Visa.findOneAndUpdate(
      { doc_id: lead_id },         // condition: match by doc_id
      { ...req.body, doc_id: lead_id }, // update fields (also ensure doc_id is set)
      {
        new: true,                 // return the updated document
        upsert: true,              // create a new document if none is found
        setDefaultsOnInsert: true // apply default values if inserting
      }
    );
    res.status(200).json({ message: 'Visa added/updated successfully', data: updatedVisa });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing visa', error: err.message });
  }
};
