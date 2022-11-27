import React, { useState, useEffect } from "react";
import "./TextOverlay.css";
import WhiteMug from "../assets/whitemug.jpg";
import BlackMug from "../assets/blackmug.jpg";

function CustomMug({ mugText, mugSrc, color, font }) {
  const [mugcolour, setMugColour] = useState(WhiteMug);
  useEffect(() => {
    if (mugSrc === "black") {
      setMugColour(BlackMug);
    } else {
      setMugColour(WhiteMug);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="image-container">
        <img
          className="ui image align-middle"
          src={mugcolour}
          alt="custom mug with text"
        />
        <div>
          <p className="overlay" style={{ color: color, fontFamily: font }}>
            {mugText}
            <i className=" fa fa-mars mx-2" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomMug;
