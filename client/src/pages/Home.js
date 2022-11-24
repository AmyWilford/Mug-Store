import React from "react";
import '../styles/home.css'



const Home = () => {
    return (
      <div className="container w-50  m-auto mt-5 justify-space-between home-page ">
        <img class = " ui image circular small" src='./assets/images/paintingmug.jpg' alt='someone painting on aa mug'/>
        <button className="massive circular yellow ui button">Go to your dashboard</button>
      </div>
      
    );
  };
  
  export default Home;
  