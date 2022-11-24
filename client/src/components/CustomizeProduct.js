import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import { useStoreContext } from "../utils/GlobalState";
import {
  ADD_PRODUCT,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
} from "../utils/mutations";
// import { idbPromise } from "../../utils/helpers";


function CustomizeProduct(item) {
  // create state varaible to hold state of new product
  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const [newProduct, setNewProduct] = useState({});


  

  // const [customizedColor, setCustomColor] = useState("");
  // const [customText, setText] = useState("");
  // const [imageIcon, setIcon] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Create state to hold state of store
  // const [state, dispatch] = useStoreContext();

  // Add product mutation

  // const { mugColor, customizedColor, customText, imageIcon } = item;
  // const {cart} = state

  const handleChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // if (name === "mugcolor") {
    //   setColor(value);
    //   console.log("mug color set");
    // } else if (name === "customizedColor") {
    //   setCustomColor(value);
    //   console.log("customizedColor set");
    // } else if (name === "cutomText") {
    //   setText(value);
    //   console.log("cutomText set");
    // } else if (name === "ImageIcon") {
    //   setIcon(value);
    //   console.log("ImageIcon set");
    // } else {
    //   setQuantity(value);
    //   console.log("quantity set");

    //   if (!mugColor || !customText || !quantity) {
    //     setErrorMessage("You are missing some details.");
    //     return;
    //   }
    // }

    
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();


    newProduct.mugColor = value;
    newProduct.mugColor = value;

    newProduct.mugColor = value;

    newProduct.mugColor = value;

    newProduct.mugColor = value;



    try {
      const { data } = await addProduct({
        variables: {
          newProduct
        },
      });
      console.log("newproduct created");
      setNewProduct({});
    } catch (err) {
      console.error(err);
    }
    // Grab information form the elements
    

    }


    console.log("forminputed");
  };

  return (
    <div>
      <Link to="/profile">Back to profile</Link>

      <div>Make your mug</div>
      <form onSubmit={handleFormSubmit}>
        <select
          placeholder="mugcolor - DROPDOWN"
          name="mugcolor"
          type="text"
          id="mugcolor"
          onChange={handleChange}
        >
          <option value="white">white</option>
          <option value="black">black</option>
        </select>
        <input
          placeholder="customizedColor"
          name="customizedColor"
          type="text"
          id="customizedColor"
          onChange={handleChange}
        />
        <input
          placeholder="cutomText"
          name="cutomText"
          type="text"
          id="cutomText"
          onChange={handleChange}
        />
        <input
          placeholder="ImageIcon"
          name="ImageIcon"
          type="text"
          id="ImageIcon"
          onChange={handleChange}
        />
        <input
          placeholder="quantity"
          name="quantity"
          type="number"
          id="quantity"
          onChange={handleChange}
        />
        <div>
          <button type="submit">Create My Mug</button>
        </div>
      </form>
    </div>
  );
}

export default CustomizeProduct;
