import React from "react";
import CustomizeProduct from "../components/CustomizeProduct";
import CustomMug from "../components/CustomMug";
import '../styles/home.css'

function Create() {
  return (
    <div className="d-flex main-content">
      <CustomMug />
      <CustomizeProduct />
    </div>
  );
}

export default Create;
