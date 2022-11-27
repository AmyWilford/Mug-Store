import React from "react";
import PrevOrder from "../components/PrevOrder";
import UserInfo from "../components/UserInfo";
import { useQuery } from '@apollo/client';
// import Auth from "../utils/auth";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";

const UserDashboard = () => {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div className="main-content d-flex" >
      <div className="flex-column white m-auto mt-5 ui raised  segment" id="user-dash">
        <div className="container d-flex flex-column align-items-center  m-auto  ">
        {user ? (
          <div className="d-flex  ui horizontal  segments" id="userdetails">
            <div className="ui raised secondary segment ">
              <UserInfo /> 
              
            </div>
            <div className="ui raised tertiary  segment ">
              <PrevOrder /> 
                     </div>
                    


          </div>
          ):(
            <Link to="/login">
            <h2>Click here to login and see your details</h2>
          </Link>
          )}
          <Link to="/create">  <img
            className=" ui image rounded shadow  medium m-2"
            src="./assets/images/paintingmug.jpg"
            alt="handing painting on a mg"></img>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
