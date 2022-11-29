import React from "react";
import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function PrevOrder() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  const orderSummary = user.orders.slice(0, 3);


  return (
    <>
      <div className="container-fluid ui stacked secondary segment ">
        <h4 className= "ui header">Your order History:</h4>
        {user ? (
          <>
            {orderSummary.map((order) => (
              <div key={order._id} className="my-2">
                <div className="flex-row ">
                    <p className="text-break ">Order# {order._id} </p>
                 </div>
              </div>
            ))}

            <Link to="/orderhistory">
              <button  className="btn btn-primary" >See more orders </button>
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PrevOrder;
