import React, { useState } from "react";
// import { Link } from "react-router-dom";

import './TextOverlay.css'


function CustomMug () {
    const WhiteMug = "./whitemug.jpg"
    const BlackMug = "./blackmug.jpg"
    const [customText, setNewText] = useState("Your Text Here");
    const [mugcolour, setMugColour] = useState(WhiteMug)

return(
    <div className="d-flex  m-auto shadow ">
    <div className="ui raised  segment">
        <img className = "ui large image mug d-flex" src ={mugcolour} alt="custom mug with text" />
        <h2 className="overlay" >{customText}</h2>
   </div>
     </div>
)
    
    


}


export default CustomMug;
