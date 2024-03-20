const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: [String],
    default: []
  },
  orders: {
    type: [String],
    default: []
  }

});

module.exports = mongoose.model("user", userSchema);
