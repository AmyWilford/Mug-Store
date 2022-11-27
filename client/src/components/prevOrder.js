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
      <div className="container ui piled segment  ">
        <h2 className="=ui header">Your order History:</h2>
        {user ? (
          <>
            {orderSummary.map((order) => (
              <div key={order._id} className="my-2">
                <div className="flex-row">
                  <Link to={`/orders/${order._id}`}>
                    <p>#{order._id}</p>
                  </Link>
                  <p>{order.status}</p>
                  <p>{order.date}</p>
                  <p>{order.total}</p>
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
