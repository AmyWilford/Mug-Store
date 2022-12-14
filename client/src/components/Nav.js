// Import required components and dependencies
import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

// Declare navigation element
function Nav() {
  // Function to show different nav elements based on login status
  function showNavigation() {
    return (
      <nav className="navbar navbar-light bg-light ">
        <div className="navbar " id="navbarNav">
          <ul className="navbar-nav">
            {Auth.loggedIn() ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-lg btn-outline-danger"
                    type="button"
                    href="/"
                    onClick={() => Auth.logout()}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <button
                      className="btn btn-lg btn-outline-secondary"
                      type="button"
                    >
                      Sign up
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button
                      className="btn btn-lg btn-outline-success"
                      type="button"
                    >
                      Login
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <header>
      <nav className="navbar justify-content-left m-auto navbar-expand shadow  navbar-light bg-light ">
        <Link to="/">
          <img
            className="animate__bounceIn "
            src="./assets/images/logo.png"
            alt="logo"
            height="80px"
          />
        </Link>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
