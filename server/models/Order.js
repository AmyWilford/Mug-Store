const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare Order Schema
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
