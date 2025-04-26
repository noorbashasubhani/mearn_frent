const icredit = require('../models/Icredit');

exports.addIcredits = async (req, res) => {
    const {
        country_name,
        sup_name,
        issue_date,
        valid_date,
        ref_no,
        amount,
        currency_type
    } = req.body;
    const user_id = req.user.userId;
    try {
        const newData = new icredit({
            country_name,
            sup_name,
            issue_date,
            valid_date,
            ref_no,
            amount,
            currency_type,
            added_by: user_id
        });

        const result = await newData.save();
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        console.error("Error saving icredit:", err);
        res.status(500).json({ message: "Something went wrong, please try again.", error: err.message });
    }
};


exports.getIntercredit=async(req,res)=>{
       try{
        const list=await icredit.find().populate("added_by","first_name");
        res.status(200).json({message:'Success',data:list});
       }catch(err){
        res.status(500).json({message:'Something went wrong',err:err.message});
       }
}

exports.getIntercreditSingle = async (req, res) => {
    const { row_id } = req.params;
    try {
        const item = await icredit.findById(row_id).populate("added_by", "first_name");
        if (!item) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.status(200).json({ message: 'Success', data: item });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}

exports.deleteIcreditNote=async(req,res)=>{
    const { row_id } = req.params;
    try{
        const deldata=await icredit.findByIdAndDelete(row_id);
        res.status(200).json({ message: 'Success deleted'});
    }catch(err){
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}

