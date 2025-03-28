const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const cors = require('cors');
const flyerRoutes = require("./routes/flyerRoutes");
const libdataRoutes = require('./routes/libdataRoutes');
const nodemailer = require('nodemailer');

//const libRoutes = require("./routes/libRoutes");
const path = require("path");


const app = express();
const PORT =  process.env.PORT || 4000;
app.use(cors());
dotenv.config();  // Load environment variables from .env

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/flyer", flyerRoutes);
app.use('/Lib', libdataRoutes);

//app.use("/upload-pdf", express.static(path.join(__dirname, "upload-pdf")));
//app.use("/libs", libRoutes);

// Connect to MongoDB
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('<h1> Welcome to Gogaga Holidays ! Project is Under Constructions! Gogaga sel</h1>');
});




const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,  // Get email from .env file
    pass: process.env.EMAIL_PASS,  // Get password from .env file
  },
  debug: true,  // Enable detailed logging
  logger: true,
});



app.post('/send-email', (req, res) => {
  const { subject, text, to } = req.body;  // Extract subject, text, and to from the request body

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email from the environment variable
    to: to,                       // Recipient email from the request body
    subject: subject,             // Subject from the request body
    text: text,                   // Body text from the request body
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
});






mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB! .....................");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






