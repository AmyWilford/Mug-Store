import React from "react";
import { Link } from "react-router-dom";

import CustomizeProduct from "../components/CustomizeProduct";
import ProductItem from "../components/ProductItem";

import "../styles/home.css";

function Create() {
  return (
    <div class="container">
      <div className="card mt-5 p-2">
        <CustomizeProduct />
        <div className="mt-3">
          <Link to="/profile">Back to profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Create;
