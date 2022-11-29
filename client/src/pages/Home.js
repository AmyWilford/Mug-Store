import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex  main-content">
      <div className="container d-flex flex-column w-50  m-auto mt-5 align-items-center animate__animated animate__fadeIn">
        <Link to="/profile">
          <button className="massive rounded grey ui button m-2">
            Go to your dashboard
          </button>
        </Link>
        <Link to="/create">
          {' '}
          <img
            className=" ui image shadow rounded medium "
            src="./assets/images/paintingmug.jpg"
            alt="someone painting on a mug"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
