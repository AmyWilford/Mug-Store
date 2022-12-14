import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/home.css'

// Declare Login Component
function Login(props) {
  // Declare formstate variables
  const [formState, setFormState] = useState({ email: '', password: '' });
  // Declare login mutation
  const [login, { error }] = useMutation(LOGIN);

  // Function to handle form submit and check for user authentification
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  // Handle change function to manage form state change on input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Return login form
  return (
    <div className=" d-flex flex-column main-content">
            <div className="container ui raised segment  mt-5 w-25 animate__animated animate__fadeIn">

    <div>Don't have an account?</div>
      <Link to="/signup">← Signup</Link>

      <h2 className='mt-3'>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="d-flex flex-column">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="w-75 rounded form-control"
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
            className="w-75 rounded form-control"
            />
        </div>
        {error ? (
          <div>
            <p >Incorrect Username or Password</p>
          </div>
        ) : null}
        <div>
          <button type="submit" className="btn btn-success mt-2">Signin</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
