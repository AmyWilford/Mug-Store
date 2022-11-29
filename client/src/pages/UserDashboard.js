import React from "react";
import PrevOrder from "../components/PrevOrder";
import UserInfo from "../components/UserInfo";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

// import Auth from "../utils/auth";
// import "../styles/home.css";
import { Link } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";

const Styleddiv = styled.img`
  box-shadow: 1rem 1rem #fdd846, -1rem -1rem #d5f0f1;
  max-width: 300px;
  margin: 3rem 0 0 1rem;
`;

const UserDashboard = () => {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  
  return (

    <div className="main-content d-flex ">
      <div
        className="d-flex flex-column white m-auto mt-5  align-items-center animate__animated animate__fadeIn"
        id="user-dash">
        
          {user ? (
            <div className=" d-flex ui horizontal mx-5 segments p-2 " id="userdetails">
              <div className="ui raised   segment ">
                <UserInfo />
              </div>
              <div className="ui raised  segment ">
                <PrevOrder />
              </div>
            </div>
          ) : (
            <Link to="/login">

              <button className="massive rounded grey ui button m-2">Click here to login and see your details</button>
            </Link>
          )}
          <Link to="/create">
              <Styleddiv className="animate__animated animate__bounceInUp" src="./assets/images/paintingmug.jpg"></Styleddiv>
            </Link>
        </div>
      </div>
  );
};

export default UserDashboard;
