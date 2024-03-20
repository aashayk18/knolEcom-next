const express = require('express');
const router = express.Router();
const { fetchCartItems, addToCart, deleteFromCart } = require('../controllers/cartControl');

router.get('/cart',  (req, res) => {
  fetchCartItems(req, res); // Pass req object to addToCart
});

router.post('/cart/add', (req, res) => {
  addToCart(req.body.productId, req, res); // Pass req object to addToCart
});

router.post('/cart/delete', (req, res) => {
    deleteFromCart(req.body.productId, req, res); // Pass req object to addToCart
  });

module.exports = router;
