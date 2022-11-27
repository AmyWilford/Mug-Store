import React from "react";
import '../styles/home.css'
import { Link } from "react-router-dom";


const Home = () => {
    return (
      <div className="d-flex  main-content">
      <div className="container d-flex flex-column w-50  m-auto mt-5 align-items-center ">
      <Link to="/create"> <img className = " ui image shadow rounded medium m-5" src='./assets/images/paintingmug.jpg' alt='someone painting on aa mug'/>
      </Link>
        <Link to="/profile">
 <button className="massive rounded grey ui button m-2">Go to your dashboard</button>
 </Link>
      </div>
      </div>
    );
  };
  
  export default Home;
  
