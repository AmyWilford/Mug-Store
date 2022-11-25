import React from "react";
import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container ui segment raised">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                                <div className="flex-column">
                  {order.products.map(({ _id, mugColor, customText, count, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <p>order id: {_id} </p>
                      <p>Mug Colour: {mugColor} </p>
                      <p>Custom Text: {customText} </p>
                      <p>Quantity: {count} </p>
                      <p>Total Order Price: ${price}</p>
                      <span>${price}</span>
                      </div>
                 ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
