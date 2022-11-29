const { getProductPrice } = require('../utils/getPrice');

const mongoose = require('mongoose');

// Declare Product Schema
const { Schema } = mongoose;

const productSchema = new Schema({
  mugColor: {
    // This would be a hex code
    type: String,
    required: true,
  },
  customizedColor: {
    // This would be a hex code
    type: String,
  },
  customText: {
    type: String,
  },
  customFont: {
    // This is a string representing our image
    type: String,
  },
  count: {
    type: Number,
    default: 1,
  },
});

// Virtual to calculate price depending on custom options (imported from helpers)
productSchema.virtual('price').get(function () {
  return getProductPrice(this);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
