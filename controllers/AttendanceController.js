const Attendance = require('../models/Attendance'); // adjust path as needed

// controllers/attendanceController.js
exports.addAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: "No records provided" });
    }

    const results = [];

    for (const record of records) {
      const { user_id, attendance_status, date } = record;

      if (!user_id || !attendance_status || !date) continue;

      // Normalize provided date
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const updated = await Attendance.findOneAndUpdate(
        { user_id, date: normalizedDate },
        { $set: { attendance_status, date: normalizedDate } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      results.push(updated);
    }

    res.status(200).json({ message: 'Attendance saved/updated successfully', data: results });
  } catch (error) {
    console.error('Attendance Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// controllers/attendanceController.js
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required' });
    }

    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const records = await Attendance.find({ date: normalizedDate });
    res.status(200).json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch attendance', error: err });
  }
};


exports.getAttendanceByUserAndMonth = async (req, res) => {
  try {
    const { user_id, month } = req.params;

    if (!user_id || !month) {
      return res.status(400).json({
        success: false,
        message: 'Both user_id and month (YYYY-MM) are required',
      });
    }

    const isValidMonth = /^\d{4}-\d{2}$/.test(month);
    if (!isValidMonth) {
      return res.status(400).json({
        success: false,
        message: 'Invalid month format. Use YYYY-MM',
      });
    }

    const [year, monthPart] = month.split('-');
    const yearInt = parseInt(year, 10);
    const monthInt = parseInt(monthPart, 10);

    if (isNaN(yearInt) || isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year or month value',
      });
    }

    const startDate = new Date(yearInt, monthInt - 1, 1);
    const endDate = new Date(yearInt, monthInt, 1);

    const records = await Attendance.find({
      user_id,
      date: { $gte: startDate, $lt: endDate },
    });

    res.status(200).json({ success: true, data: records });

  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance',
      error,
    });
  }
};



