import React from "react";
// import '../styles/home.css'
import { Link } from "react-router-dom";
import styled from "styled-components";

// const Flexcontainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const Styleddiv = styled.img`
  box-shadow: 1rem 1rem #fdd846, -1rem -1rem #d5f0f1;
  max-width: 300px;
  margin: 3rem 0 0 1rem;
`;

const Home = () => {
  return (
    <div className="container pt-5">
      <div className="row d-flex align-items-center">
        <div className="col-md-7">
          <h4>Create a gift they'll reach for each day.</h4>
          <p>
            Welcome to Javascript, creating custom mugs that hold your favourite
            memories  within arms reach.
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
              <button className="rounded yellow ui button m-2">
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
        <div className="col-md-5">
          <div>
            <Styleddiv src="./assets/images/paintingmug.jpg"></Styleddiv>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div className="container d-flex w-50  m-auto mt-5 align-items-center ">
  <Link to="/create">
    {" "}
    <S
      className=" ui image shadow rounded medium m-5"
      src="./assets/images/paintingmug.jpg"
      alt="someone painting on aa mug"
    />
  </Link>
  <Link to="/profile">
    <button className="massive rounded yellow ui button m-2">
      Go to your dashboard
    </button>
  </Link>
</div>; */
}