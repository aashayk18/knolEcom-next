const Product = require("../models/Product");

const fetchProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query = {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { description: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    if (req.query.category) {
      query.category = { $regex: new RegExp(req.query.category, 'i') };
    }

    if (req.query.rating) {
      const ratingValue = parseFloat(req.query.rating.split(" ")[1]);
      
      let comparisonOperator;
      if (req.query.rating.startsWith("Above")) {
        comparisonOperator = "$gte"; 
      } 
      query.avgRating = { [comparisonOperator]: ratingValue };
    }

    let products = await Product.find(query);

    if (req.query.sortBy) {
      if (req.query.sortBy === 'priceLTH') {
        products = products.sort((a, b) => a.price - b.price);
      } else if (req.query.sortBy === 'priceHTL') {
        products = products.sort((a, b) => b.price - a.price);
      } else if (req.query.sortBy === 'ratingDesc') {
        products = products.sort((a, b) => b.avgRating - a.avgRating);
      }
    }

    const formattedProducts = products.map((product) => {
      return {
        id: product._id,
        name: product.name,
        price: product.price,
        desc: product.description,
        img: product.image,
        rating: product.avgRating,
        cat: product.category,
      };
    });
    res.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductIds = async(req, res) => {
  try {
    const products = await Product.find({}, '_id');
    const productIds = products.map(product => product._id.toString());
    res.json(productIds);
  } catch (err) {
    console.error('Error getting product IDs' , err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = { fetchProducts, getProduct, getProductIds };
