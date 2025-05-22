const Supplier=require('../models/Supplier');

exports.addSupplier=async(req,res)=>{
    const {lead_id}=req.params;
    try{
    const supplierNew=new Supplier({
            sup_mail:req.body.sup_mail,
            sup_quote:req.body.sup_quote,
            service:req.body.service,
            destination:req.body.destination,
            company_name:req.body.company_name,
            contact_number:req.body.contact_number,
            sup_currecny:req.body.sup_currecny,
            currency_rate:req.body.currency_rate,
            total_cost:req.body.total_cost,
            cost_bifurication:req.body.cost_bifurication,
            doc_id:lead_id
    });
    const list=await supplierNew.save();
    res.status(200).json({message:'Data saved',list});
    }catch(err){
        res.status(500).json({message:'Data not saved'});
    }
}

exports.getSuppliers=async(req,res)=>{
     try{
        const list=await Supplier.find();
        res.status(200).json({message:'success',list});
     }catch(error){
        res.status(500).json({message:'Data not saved'});
     }
}