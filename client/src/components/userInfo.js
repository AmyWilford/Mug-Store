import React , { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

function UserInfo() {
  const { data } = useQuery(QUERY_USER);
  let user;
  const [formState, setFormState] = useState();
  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await updateUser({
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
    const token = mutationResponse.data.editUser.token;
    console.log("Got token");
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log('change handled');
  };

  if (data) {
    user = data.user;
  }

  return (
    <div className="container my-1">
      {user ? (
        <>
          <h1>{user.firstName}'s dashboard</h1>
          <h3>Email Address</h3>
          <p>{user.email}</p>
          <h3>Shipping Address</h3>
          <p> {user.address}</p>
          <p>{user.city}</p>
          <p>{user.province}</p>
          <p>{user.country}</p>
          {/* MODAL BUTTON  */}
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter">
            Edit user details
          </button>
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              {/* MODAL FORM */}
              <form
                className="modal-content modal-body"
                onSubmit={handleFormSubmit}>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputFirstName">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputFirstName"
                      placeholder={user.firstName}
                      onChange={handleChange}
                       />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputLastName">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputLastName"
                      placeholder={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter New Password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder={user.address}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputCity"
                      placeholder={user.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">State/Province</label>
                    <input
                      id="inputState"
                      class="form-control"
                      placeholder={user.province}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputCountry">Country</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputCountry"
                      placeholder={user.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button type="submit" class="btn btn-primary mt-3">
                  Update profile
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Link to="/login">
          <p>Click here to login and see your details</p>
        </Link>
      )}
    </div>
  );
}

export default UserInfo;
