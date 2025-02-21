const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const cors = require('cors');
const flyerRoutes = require("./routes/flyerRoutes");
const path = require("path");



const app = express();
const PORT =  process.env.PORT || 4000;


app.use(cors());
dotenv.config();  // Load environment variables from .env
// Log the MONGO_URL to verify it is being loaded
//console.log("MongoDB URL:", process.env.MONGO_URL);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/flyer", flyerRoutes);
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
    res.send('<h1> Welcome to Gogaga Holidays ! Project is Under Constructions! Gogaga sel</h1>');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






