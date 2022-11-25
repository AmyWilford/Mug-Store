import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./TextOverlay.css";

import WhiteMug from "../assets/whitemug.jpg";
import BlackMug from "../assets/blackmug.jpg";

function CustomMug({ mugText, mugSrc, color }) {
  console.log(color);
  console.log(mugSrc);
  //   const [customText, setNewText] = useState("Your Text Here");

  const [mugcolour, setMugColour] = useState(WhiteMug);
  useEffect(() => {
    if (mugSrc === "black") {
      setMugColour(BlackMug);
    } else {
      setMugColour(WhiteMug);
    }
  });

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
          <p className=" display-5 overlay" style={{ color: color }}>
            {mugText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomMug;
