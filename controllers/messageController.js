// controllers/messageController.js
const Message=require('../models/Message');

// CREATE
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET ALL
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET ONE
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE
exports.deleteMessage = async (req, res) => {
  const {id}=req.params;
  try {
    const result = await Message.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ success: false, message: 'Not found' });

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateMessage=async(req,res)=>{
const {id}=req.params;
const newData=req.body;
  try{
    const result=await Message.findByIdAndUpdate(id,newData,{new:true});
    if (!result) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Updated successfully' });
  }catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}