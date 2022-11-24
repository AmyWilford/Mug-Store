import React from "react";
import PrevOrder from "../components/PrevOrder";
import UserInfo from "../components/UserInfo";
import Auth from "../utils/auth";
import "../styles/home.css";

const UserDashboard = () => {
  return (
    <div className="main-content d-flex">
      <div className="flex-column white m-auto" id="user-dash">
        <div className="container d-flex flex-column align-items-center  m-auto  ">
          <div className="d-flex  ui horizontal segments" id="userdetails">
            <div className="ui raised segment ">
              {/* <UserInfo /> */} 
              <h2>USERNAME</h2>
              <h3>EMAIL ADDRESS</h3>
              <h3>SHIPPING ADDRESS</h3>
            </div>
            <div className="ui raised segment ">
              {/* <PrevOrder /> */} 
              <h3>PREVIOUS ORDER</h3>
              <h3>PREVIOUS ORDER</h3>
            </div>
          </div>
          <img
            className=" ui image rounded shadow  medium m-2"
            src="./assets/images/paintingmug.jpg"
            alt="handing painting on a mg"></img>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
