import React from "react";
import { Link } from "react-router-dom";
import CustomizeProduct from "../components/CustomizeProduct";
import "../styles/home.css";

// Create a mug page which pulls in the CustomizeProduct element
function Create() {
  return (
    <div className="main-content d-flex " >
      <div className="row d-flex align-items-center ui p-5 secondary segment raised m-auto mt-5 animate__animated animate__fadeIn">
        <CustomizeProduct />
        <div className="mt-3">
          <Link to="/profile">← Back to profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Create;
