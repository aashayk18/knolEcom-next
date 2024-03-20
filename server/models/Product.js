const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
