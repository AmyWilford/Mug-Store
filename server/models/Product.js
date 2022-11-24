const { getProductPrice } = require('../utils/getPrice');

const mongoose = require('mongoose');

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
  imageIcon: {
    // This is a string representing our image
    type: String,
  },
  count: {
    type: Number,
    default: 1,
  },
});

productSchema.virtual('price').get(() => {
  return getProductPrice(this);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
