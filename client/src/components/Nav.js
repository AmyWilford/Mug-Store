import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import Cart from './Cart';

function Nav() {
  function showNavigation() {
    return (    
            <nav className="navbar navbar-expand-sm  navbar-light bg-light ">
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
              <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav mr-auto">
    
        {Auth.loggedIn() ? (
          <>
                    <li className="nav-item ">
                {/* <Cart /> */}
              </li>
              <li className="nav-item">
                <button className="btn btn-lg btn-outline-danger" type="button" href="/" onClick={() => Auth.logout()}>
                  Log out
                </button>
              </li>
              </>
          ) :
          (<>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
               
            </>
          )}
          </ul>
          </div>
        </nav>
        )}
    
    


  return (
    <header>
      <nav className="navbar m-auto navbar-expand-lg shadow navbar-light bg-light ">
        <Link to="/">
          <img src="./assets/images/logo.png" alt="logo" height="80px" />
        </Link>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
