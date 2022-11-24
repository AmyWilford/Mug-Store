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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
  return (
    <header>
      <Link to="/">
        <div>LOGO</div>
      </Link>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
