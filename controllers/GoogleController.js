const Google=require('../models/Google');

exports.addReview=async(req,res)=>{
   try{
    const saveData=await Google.create({
        ...req.body
    });
    res.status(200).json({ message: 'Review added successfully', data: saveData });
   }catch(err){
    res.status(500).json({ message: 'Failed to add review', error: err.message });
   }
}

exports.getAllReviews=async(req,res)=>{
  try{
    const respnce=await Google.find().populate({path:'doc_id',select:'customer_name'}).populate({path:'added_by',select:'first_name'});
   res.status(200).json({ message: 'Data comming successfully', data: respnce });
  }catch(err){
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
}

exports.getSelectCustomer=async(req,res)=>{
  try{
        const respnce=await Google.find({doc_id:req.params.doc_id}).
        populate({path:'doc_id',select:'customer_name'}).
         populate({path:'changed_by_status',select:'first_name'}).
        populate({path:'added_by',select:'first_name'});

    res.status(200).json({ message: 'Data comming successfully', data: respnce });
  }catch(err){
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
}


// Example backend controller
exports.updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status, changed_by_status } = req.body;

  try {
    const updated = await Google.findByIdAndUpdate(
      id,
      { status, changed_by_status },
      { new: true }
    );
    res.status(200).json({ message: 'Status updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
