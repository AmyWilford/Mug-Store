import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  return (
    <div className="main-content d-flex ">
      <div className=" ui segment w-50 raised m-auto mt-5 animate__animated animate__fadeInDown">
        <Link to="/profile">← Back to Dashboard</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <div className="flex-column ui raised horizontal segments">
                  <h4 className="m-2" key={order}>
                    Order # {order._id} - {order.products.length} items
                  </h4>
                  {order.products.map(
                    ({ mugColor, customText, price }, index) => (
                      <div className="ui segments m-1">
                        <div key={index} className="ui segment secondary ">
                          <p>
                            <b>Mug Colour:</b> {mugColor}
                          </p>
                          <p>
                            <b>Custom Text:</b> {customText}
                          </p>
                          <p>
                            <b>Price:</b> ${price}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default OrderHistory;
