module.exports = {
  getProductPrice: (product) => {
    let price = 0;

    if (product.mugColor != null) {
      price += 10;
    }
    if (product.customizedColor != null) {
      price += 5;
    }
    if (product.customText != null) {
      price += 7;
    }
    if (product.customFont != null) {
      price += 10;
    }
    return price * product.count;
  },
};
