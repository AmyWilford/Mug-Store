import React from "react";
// import '../styles/home.css'
import { Link } from "react-router-dom";
import styled from "styled-components";


// Styled components to style image on home page
const Styleddiv = styled.img`
  box-shadow: 1rem 1rem #fdd846, -1rem -1rem #d5f0f1;
  max-width: 300px;
  margin: 3rem 0 0 1rem;
`;

const Home = () => {
  return (
    <div className="main-content d-flex ">
      <div className="row d-flex align-items-center ui p-5 secondary segment raised m-auto mt-5 animate__animated animate__fadeIn">
        <div className="col-md-7">
          <h3>Create a gift they'll reach for each day.</h3>
          <p>
            Welcome to Javascript, creating custom mugs that hold your favourite
            memories within arms reach.
          </p>
          <ul>
            <li>Standard 11-oz capacity mugs</li>
            <li>Your choice of black or white mug</li>
            <li>Personalized syles with custom text, colors, and fonts</li>
            <li>Dishwasher & microwave-safe</li>
            <li>Available in single and bulk orders</li>
          </ul>
          <p>
            Whether you're looking for a unique gift or a treat-yourself moment,
            javascript mugs are quick, simple, and unique.
          </p>
          <div className="d-flex flex-wrap flex-row">
            <Link to="/create">
              <button className="rounded teal ui button m-2">
                Design A Mug
              </button>
            </Link>

            <div>
              <Link to="/profile">
                <button className="rounded yellow ui button m-2">
                  Go To Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-5 ">
          <div>
            <Link to="/create">
              <Styleddiv className="animate__animated animate__bounceInRight" src="./assets/images/paintingmug.jpg"></Styleddiv>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

