import React, { useState, useEffect } from "react";
import "./TextOverlay.css";
import WhiteMug from "../assets/whitemug.jpg";
import BlackMug from "../assets/blackmug.jpg";
import styled from "styled-components";

const Overlay = styled
const StyledOverlay = styled.p`
  display: inline-block;
  flex-wrap: wrap;
  font-size: 2.7rem;
  word-wrap: break-word;
  text-align: center;
  max-width: 400px;
  position: absolute;
  margin-bottom: 0px;
  top: 25%;
  left: 40%;
  width: 40%;
  line-height: 1.2em;

  @media only screen and (max-width: 450px) {
    font-size: 2.1rem;
  }
`;

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
          className="ui image align-middle shadow"
          src={mugcolour}
          alt="custom mug with text"
        />
        <div>
          <StyledOverlay style={{ color: color, fontFamily: font }}>
            {mugText}
          </StyledOverlay>
        </div>
      </div>
    </div>
  );
}

export default CustomMug;
