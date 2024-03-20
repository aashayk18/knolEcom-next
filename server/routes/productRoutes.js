const express = require('express');
const router = express.Router();
const { fetchProducts, getProduct, getProductIds } = require('../controllers/productController');

router.get('/products', fetchProducts);
router.get('/products/:id', getProduct);
router.get('/product/ids', getProductIds)

module.exports = router;