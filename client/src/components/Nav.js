import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Cart from "./Cart";

function Nav() {
  function showNavigation() {
    // if user is logged in
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/dashboard">LOGO</Link>
          </li>
          <li>
            <Cart />
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    }
  }
}

export default Nav;
