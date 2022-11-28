import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
// import "../styles/home.css";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

const UpdateUser = () => {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  console.log(user)
  console.log(data)
  const [formState, setFormState] = useState({
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    city: `${user.city}`,
    address: `${user.address}`,
    province: `${user.province}`,
    country: `${user.country}`,
    email: `${user.email}`,
    password: `${user.password}`,
  });
  console.log(formState);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("update user button clicked");
    const mutationResponse = await updateUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        address: formState.address,
        city: formState.city,
        province: formState.province,
        country: formState.country,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.updateUser.token;
    Auth.update(token);
    // window.location.reload();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="main-content d-flex ">
      <div className="container d-flex flex-column ui segment align-items-center w-25 m-auto animate__animated animate__fadeIn mt-5">
        <form
          onSubmit={handleFormSubmit}
          autoComplete="off">
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="inputFirstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="inputFirstName"
                placeholder={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-8">
              <label htmlFor="inputLastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="inputLastName"
                placeholder={user.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail4"
                placeholder={user.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="form-group col-md-8">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Enter New Password"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="inputAddress">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="inputAddress"
              placeholder={user.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                id="inputCity"
                placeholder={user.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">State/Province</label>
              <input
                id="inputState"
                type="text"
                name="province"
                className="form-control"
                placeholder={user.province}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCountry">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                id="inputCountry"
                placeholder={user.country}
                onChange={handleChange}
              />
            </div>
          </div>
        <div>
          <button type="submit" className="btn  btn-success mt-3">
            Update profile
          </button>
         <Link to="/profile"> <button className="btn btn-secondary  mt-3">  
            Back to dashboard
          </button></Link> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
