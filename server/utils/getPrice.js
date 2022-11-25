module.exports = {
  getProductPrice: (product) => {
    let price = 0;
    console.log(product);
    if (product.mugColor != null) {
      price += 10;
    }
    if (product.customizedColor != null) {
      price += 5;
    }
    if (product.customText != null) {
      price += 7;
    }
    if (product.imageIcon != null) {
      price += 10;
    }
    console.log("hello");
    return price * product.count;
  },
};
