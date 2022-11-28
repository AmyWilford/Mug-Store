import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import styled from "styled-components";

const Styledlist = styled.ul``;

function Nav() {
  function showNavigation() {
    // if user is logged in
    if (Auth.loggedIn()) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </li>
             
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
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
      <nav className="navbar navbar-expand-lg shadow navbar-light bg-light ">
        <Link to="/">
          <img src="./assets/images/logo.png" alt="logo" height="80px" />
        </Link>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
