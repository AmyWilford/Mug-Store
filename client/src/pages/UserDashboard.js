import React from "react";
import PrevOrder from "../components/PrevOrder";
import UserInfo from "../components/UserInfo";
import Auth from "../utils/auth";


const UserDashboard = () => {
  if (Auth.loggedIn()) {
    return (
      <div className="container  w-50  m-auto mt-5 justify-space-between">
        <UserInfo />
        <PrevOrder />
        <img src='./assets/images/paintingmug.jpg' alt='handing painting on a mg'>Create A Mug</img>
      </div>
    );
  };}
  
  export default UserDashboard;
  