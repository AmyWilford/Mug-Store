import React from "react";
import '../styles/home.css'
import { Link } from "react-router-dom";


const Home = () => {
    return (
      <div className="main-content">
      <div className="container w-75   mt-5 home-buttons">
        <img className = " ui image circular small m-2" src='./assets/images/paintingmug.jpg' alt='someone painting on aa mug'/>
        <Link to="/profile">
 <button className="massive circular yellow ui button m-2">Go to your dashboard</button>
 </Link>
      </div>
      </div>
    );
  };
  
  export default Home;
  
