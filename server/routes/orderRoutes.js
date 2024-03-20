const express = require('express');
const router = express.Router();
const { placeOrder, fetchOrders } = require('../controllers/orderController');

router.post('/place', (req, res) => {
    placeOrder(req, res); // Pass req object to placeOrder
  });

router.get('/fetch', (req, res) => {
  fetchOrders(req, res); // Pass req object to fetchOrder
})

module.exports = router;