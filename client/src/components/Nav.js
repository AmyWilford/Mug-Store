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
            <Cart />
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }
  return (
    <header>
      <Link to="/">
        <div>LOGO</div>
      </Link>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
