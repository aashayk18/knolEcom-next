const jwt = require("jsonwebtoken");
const User = require("../models/User");

const fetchCartItems = async (req, res) => {
  try {
    const token = req.headers.authorization;
    // Decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    // Fetch user by ID and return their cart items
    const user = await User.findById(userId);
    res.json(user.cart); // Assuming user.cartItems is an array of cart items
  } catch (error) {
    console.error("Error fetching user cart items:", error);
  }
};

const addToCart = async (productId, req, res) => {
  try {
    const token = req.headers.authorization;
    // Decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user.cart.includes(productId)) {
      // Add the product ID to the user's cart array
      user.cart.push(productId);
    }

    // Save the updated user object
    await user.save();
    res.status(200).json("Added successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const deleteFromCart = async (productId, req, res) => {
  try {
    const token = req.headers.authorization;
    // Decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    // Find the user by ID
    const user = await User.findById(userId);

    // Delete the product ID from the user's cart array

    const index = user.cart.indexOf(productId);
    if (index > -1) {
      user.cart.splice(index, 1);
    }
    // Save the updated user object
    await user.save();
    res.status(200).json("Deleted successfully!");
  } catch (error) {
    console.error("Error deleting product from cart:", error);
  }
};

module.exports = { fetchCartItems, addToCart, deleteFromCart };
