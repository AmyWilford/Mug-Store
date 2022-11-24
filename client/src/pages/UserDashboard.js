import React from "react";
import prevOrder from "../components/prevOrder";
import userInfo from "../components/userInfo";


const UserDashboard = () => {
    return (
      <div className="container">
        <userInfo />
        <prevOrder />
      </div>
    );
  };
  
  export default UserDashboard;
  