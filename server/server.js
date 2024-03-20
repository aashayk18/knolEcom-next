const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors"); 
const { authenticateToken } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Routes protected using middleware 

app.use("/", authRoutes);

// app.use(authenticateToken)

// Routes

app.use("/api/", productRoutes);
app.use("/db/", cartRoutes);
app.use("/orders/", orderRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "knolEcom",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
