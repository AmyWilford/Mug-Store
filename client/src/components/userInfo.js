import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";

function UserInfo() {
  const { data } = useQuery(QUERY_USER);
  let user;

  const [editUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await editUser({
      variables: {
        email: document.getElementById("inputEmail4").value,
        address: document.getElementById("inputAddress").value,
        // city: city,
        // address: address,
        // province: province,
        // country: country,
        // email: email,
        // password: password,
      },
    });
    const token = mutationResponse.data.editUser.token;
    console.log("Got token");
    Auth.login(token);
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
          {/* MODAL AND BUTTON  */}
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
                      value={user.firstName}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputLastName">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputLastName"
                      value={user.lastName}
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
                      value={user.email}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Enter New Password"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    value={user.address}
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputCity"
                      value={user.city}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">State/Province</label>
                    <input
                      id="inputState"
                      class="form-control"
                      value={user.province}
                    />
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputCountry">Country</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputCountry"
                      value={user.country}
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
