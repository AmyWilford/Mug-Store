import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_PRODUCT } from "../utils/mutations";
// import Auth from "../utils/auth";

function CustomizeInput() {
  const [product, createProduct] = useState("");
  const [state, dispatch] = useStoreContext();

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);

  // const {
  //     mugColor,
  //     customizedColor,
  //     customText,
  //     imageIcon
  //     quantitiy
  // } = item;

  // const {cart} = state

  return (
    <div>
      <Link to="/profile">Back to profile</Link>

      <div>Make your mug</div>
      <form>
        <select
          placeholder="mugcolor - DROPDOWN"
          name="mugcolor"
          type="text"
          id="mugcolor"
          // onChange={handleChange}
        >
          <option value="white">white</option>
          <option value="black">black</option>
        </select>
        <input
          placeholder="customizedColor"
          name="customizedColor"
          type="text"
          id="customizedColor"
          // onChange={handleChange}
        />
        <input
          placeholder="cutomText"
          name="cutomText"
          type="text"
          id="cutomText"
          // onChange={handleChange}
        />
        <input
          placeholder="ImageIcon"
          name="ImageIcon"
          type="text"
          id="ImageIcon"
          // onChange={handleChange}
        />
        <input
          placeholder="quantity"
          name="quantity"
          type="number"
          id="quantity"
          // onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default CustomizeInput;
