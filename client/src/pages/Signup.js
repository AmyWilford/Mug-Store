import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import '../styles/home.css';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('event prevent default');

    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        city: formState.city,
        address: formState.address,
        province: formState.province,
        country: formState.country,
        email: formState.email,
        password: formState.password,
      },
    });

    const token = mutationResponse.data.addUser.token;
    console.log('Got token');
    Auth.login(token);
    console.log(token);

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log('change handled');
  };

  return (
    
    <div className=" d-flex flex-column main-content ">
      <div className="container ui raised 
  segment  mt-5 w-25">
      <div>Already have an account?</div>

        <Link to="/login">← Go to Login</Link>

        <h2 className='mt-3'>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="Enter first name here"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
              className="w-75 rounded form-control"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
              className="w-75 rounded form-control"
              />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="w-50 rounded form-control"
              />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="w-50 rounded form-control"
              />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="pwd">City:</label>
            <input
              placeholder="Toronto"
              name="city"
              type="text"
              id="city"
              onChange={handleChange}
              className="w-50 rounded form-control"
              />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="pwd">Address:</label>
            <input
              placeholder="123 street st."
              name="address"
              type="text"
              id="address"
              onChange={handleChange}
              className="w-50 rounded form-control"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="pwd">Province:</label>
            <input
              placeholder="ON"
              name="province"
              type="text"
              id="province"
              onChange={handleChange}
              className="w-50 rounded form-control"
              />
            <div className="d-flex flex-column">
              <label htmlFor="pwd">Country:</label>
              <input
                placeholder="country"
                name="country"
                type="text"
                id="country"
                onChange={handleChange}
                className="w-50 rounded form-control"
                />
            </div>
          </div>
          <div className="flex-row flex-end">
            <button type="submit"  className="btn btn-secondary mt-2">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
