const jwt = require("jsonwebtoken");
const User = require("../models/User");

const placeOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;
    // Decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    // Fetch user by ID and add their cart items to the orders array
    const user = await User.findById(userId);
    user.orders.push(...user.cart);

    // Empty cart array
    user.cart = [];
    
    // Save user
    await user.save();
    res.status(200).json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const fetchOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    // Decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    // Fetch user by ID and return their order items
    const user = await User.findById(userId);
    res.json(user.orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    // throw new Error("Error fetching orders"); 
  }
};

module.exports = { placeOrder, fetchOrders };
