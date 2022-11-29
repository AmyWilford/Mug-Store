import React from "react";
import { Link } from "react-router-dom";
// import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
function UserInfo() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  return (
    <>
      {user ? (
        <>
          <h2 className="text-break ">{user.firstName}'s dashboard</h2>
          <h3 >Email Address</h3>
          <p className="text-break ">{user.email}</p>
          <h3>Shipping Address</h3>
        <ul className="list-unstyled">
          <li>{user.address}</li>
          <li>{user.city}</li>
          <li>{user.province}</li>
          <li>{user.country}</li>
          </ul>
        <Link to="/updateuser">  <button
            type="button"
            className="btn btn-primary"
            >
            Edit user details
          </button></Link>
        </>
      ) : (
        <Link to="/login">
          <p>Click here to login and see your details</p>
        </Link>
      )}
      </>
  );
}
export default UserInfo;
