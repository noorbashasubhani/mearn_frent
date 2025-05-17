const Account=require('../models/Account');



exports.addAcc = async (req, res) => {
  try {
    const account = new Account(req.body);
    const saved = await account.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getData = async (req, res) => {
  // Uncomment the following line if you want to filter by lead_id from the query parameters
  // const { lead_id } = req.query; // Use req.query if you're passing it via URL query string

  try {
    // Optional filtering logic
    // const filter = lead_id ? { lead_id } : {};

    const list = await Account.find(/* filter */)
      .sort({ _id: -1 });

    res.status(200).json({ message: 'success', data: list });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};


exports.updateAcc = async (req, res) => {
  const { account_id } = req.params;

  try {
    const updated = await Account.findByIdAndUpdate(
      account_id,
      req.body, // data to update
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json({ message: 'Account updated successfully', data: updated });
  } catch (err) {
    console.error('Error updating account:', err);
    res.status(500).json({ message: 'Error occurred while updating', error: err.message });
  }
};
