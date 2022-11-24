import React from "react";
import '../styles/home.css'

const Home = () => {
    return (
      <div className="main-content">
      <div className="container w-75   mt-5 home-buttons">
        <img className = " ui image circular small m-2" src='./assets/images/paintingmug.jpg' alt='someone painting on aa mug'/>
        <button className="massive circular yellow ui button m-2">Go to your dashboard</button>
      </div>
      </div>
    );
  };
  
  export default Home;
  
