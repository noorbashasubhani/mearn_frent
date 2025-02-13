const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');

const app = express();
const PORT =  process.env.PORT || 4000;

dotenv.config();  // Load environment variables from .env
// Log the MONGO_URL to verify it is being loaded
console.log("MongoDB URL:", process.env.MONGO_URL);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB! .....................");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('<h1> Welcome to Gogaga Holidays ! Project is Under Constructions!</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






