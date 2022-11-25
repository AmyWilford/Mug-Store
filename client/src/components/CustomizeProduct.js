import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";
import CustomMug from "../components/CustomMug";
// import "font-awesome/css/font-awesome.min.css";

// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
// import { idbPromise } from "../utils/helpers";

// import { HexColorPicker } from "react-colorful";
// import "react-colorful/dist/index.css";

function CustomizeProduct(item) {
  // const [color, setColor] = useState("#aabbcc");

  const [newProduct, setNewProduct] = useState({
    mugColor: "",
    customizedColor: "",
    customText: "",
    imageIcon: "",
    count: "",
  });

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const [errorMessage, setErrorMessage] = useState("");
  // const [state, dispatch] = useStoreContext();

  // const { cart } = state;

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //     idbPromise("cart", "put", {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 },
  //     });
  //     idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "mugColor") {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === "customizedColor") {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === "customText") {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === "imageIcon") {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === "count") {
      setNewProduct({ ...newProduct, [name]: parseInt(value) });
      console.log(newProduct);
    }
    console.log(newProduct);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("I am working");
    try {
      const { data } = await addProduct({
        variables: { ...newProduct },
      });
      console.log(newProduct);
      setNewProduct({
        mugColor: "",
        customizedColor: "",
        customText: "",
        imageIcon: "",
        count: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  // test
  return (
    <div>
      <Link to="/profile">Back to profile</Link>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div>Customize Your Mug</div>
            <form onSubmit={handleFormSubmit}>
              <div class="form-group">
                <label for="exampleFormControlSelect1">
                  Pick your mug color
                </label>
                <select
                  className="form-control"
                  name="mugColor"
                  onChange={handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  Write out your customized Text
                </label>
                <input
                  placeholder="customizedColor"
                  className="form-control"
                  name="customizedColor"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Pick your color text</label>
                <input
                  className="form-control"
                  placeholder="cutomText"
                  name="customText"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  Select an image (optional)
                </label>

                <select
                  className="form-control"
                  placeholder="imageIcon"
                  name="imageIcon"
                  type="text"
                  onChange={handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="image1">image one</option>
                  <option value="image2">Image Two</option>
                  <option value="image3">image Three</option>
                  <option value="image4">Image Four</option>
                </select>
              </div>
              <div class="form-group">
                <select
                  className="form-control"
                  placeholder="quantity"
                  name="count"
                  type="number"
                  onChange={handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="3">Four</option>
                  <option value="3">Five</option>
                </select>
              </div>
              <div>
                <button type="submit">Create My Mug</button>
              </div>
              {error && <div>Something went wrong...</div>}
            </form>
          </div>
          <div className="col-sm-6">
            <CustomMug />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeProduct;
