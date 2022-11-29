module.exports = {
  getProductPrice: (product) => {
    let price = 0;

    if (product.mugColor != null) {
      price += 5;
    }
    if (product.customizedColor != null) {
      price += 1;
    }
    if (product.customText != null) {
      price += 1;
    }
    if (product.customFont != null) {
      price += 1;
    }
    return price 
    // return price * product.count;

  },
};
