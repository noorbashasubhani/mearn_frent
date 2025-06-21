const Tcs=require('../models/Tcs');

exports.addTcs = async (req, res) => {
  const { lead_id } = req.params;

  try {
    const data = await Tcs.findOneAndUpdate(
      { doc_id: lead_id }, // search condition
      {
        is_customer_paying_tcs: req.body.is_customer_paying_tcs,
        tcs_per: req.body.tcs_per,
        tcs_amount: req.body.tcs_amount,
        invoice: req.body.invoice,
        adhar: req.body.adhar,
        doc_id: lead_id
      },
      {
        new: true,      // return the updated document
        upsert: true,   // create it if it doesn't exist
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({ message: 'success', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error', error: err.message });
  }
};



exports.getTcs = async (req, res) => {
  const { lead_id } = req.params;
  try {
    const list = await Tcs.find({ doc_id: lead_id });
    res.status(200).json({ message: 'success', data: list }); // ✅ 200 for success
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error', error: err.message });
  }
};
