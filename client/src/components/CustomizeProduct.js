import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import { useStoreContext } from "../utils/GlobalState";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
// import { idbPromise } from "../utils/helpers";

function CustomizeProduct(item) {
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

  return (
    <div>
      <Link to="/profile">Back to profile</Link>

      <div>Customize Your Mug</div>
      <form onSubmit={handleFormSubmit}>
        <select
          placeholder="mugcolor - DROPDOWN"
          name="mugColor"
          type="text"
          onChange={handleChange}
        >
          <option>select a color</option>
          <option value="white">white</option>
          <option value="black">black</option>
        </select>
        <input
          placeholder="customizedColor"
          name="customizedColor"
          type="text"
          onChange={handleChange}
        />

        <input
          placeholder="cutomText"
          name="customText"
          type="text"
          onChange={handleChange}
        />
        <input
          placeholder="ImageIcon"
          name="imageIcon"
          type="text"
          onChange={handleChange}
        />
        <input
          placeholder="quantity"
          name="count"
          type="number"
          onChange={handleChange}
        />
        <div>
          <button onSubmit={handleFormSubmit} type="submit">
            Create My Mug
          </button>
        </div>
        {error && <div>Something went wrong...</div>}
      </form>
    </div>
  );
}

export default CustomizeProduct;
