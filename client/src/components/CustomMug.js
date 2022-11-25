import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
import "./TextOverlay.css";
import WhiteMug from "../assets/whitemug.jpg";
import BlackMug from "../assets/blackmug.jpg";

function CustomMug({ mugText, mugSrc }) {
  console.log(mugSrc);
  // const WhiteMug = "./whitemug.jpg"
  // const BlackMug = "./blackmug.jpg"
  //   const [customText, setNewText] = useState("Your Text Here");
  const [mugcolour, setMugColour] = useState(WhiteMug);
  //   const [typeface, setTypeface] = useState();

  return (
    <div className="d-flex  m-auto shadow ">
      <div className="ui raised segment">
        <img
          className="ui large image  d-flex"
          src={mugcolour}
          alt="custom mug with text"
        />
        <div className="textcontainer">
          {/* <p className="overlay" style={typeface}> */}
          <p className=" display-5 overlay">{mugText}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomMug;
