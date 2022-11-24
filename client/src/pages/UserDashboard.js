import React from "react";
import PrevOrder from "../components/PrevOrder";
import UserInfo from "../components/UserInfo";
import Auth from "../utils/auth";
import '../styles/home.css'



const UserDashboard = () => {

    return (
      <div className="main-content d-flex">
    <div className="d-flex flex-column white m-auto" id="user-dash">
      <div className="container  w-50  m-auto mt-5 justify-space-between">
       <div className = "d-flex" id ="userdetails">
       <div className ="ui raised segment" >
           {/* <UserInfo /> */} <p>test</p>
         </div>  
         <div className ="ui raised segment" >
            {/* <PrevOrder /> */} <p>test</p>
            </div>
        </div>
        <img className = " ui image rounded shadow medium m-2" src='./assets/images/paintingmug.jpg' alt='handing painting on a mg'></img>
      </div>
      </div>
      </div>
    );
  };
  
  export default UserDashboard;
  