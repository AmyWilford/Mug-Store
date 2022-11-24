import React from "react";
import PrevOrder from "../components/PrevOrder";
import UserInfo from "../components/UserInfo";


const UserDashboard = () => {
    return (
      <div className="container">
        <UserInfo />
        <PrevOrder />
        <img src='./assets/images/paintingmug.jpg' alt='handing painting on a mg'>Create A Mug</img>
      </div>
    );
  };
  
  export default UserDashboard;
  