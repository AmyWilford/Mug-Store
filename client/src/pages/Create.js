import React from "react";
import { Link } from "react-router-dom";

import CustomizeProduct from "../components/CustomizeProduct";

import "../styles/home.css";

function Create() {
  return (
    <div>
      <div className="mt-5 p-4">
        <CustomizeProduct />
        <div className="mt-3">
          <Link to="/profile">← Back to profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Create;
