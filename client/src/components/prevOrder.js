import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function prevOrder() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  const orderSummary= user.orders.slice(0, 3)

  return (
    <>
      <div className="container my-1">
       
          <>
            <h2>
              Order History 
            </h2>
        
            {orderSummary.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                <Link to={`/orders/${_id}`}>
                    <p>#{order._id}</p> 
                    </Link>
                    <p>{order.status}</p>
                    <p>{order.date}</p>
                    <p>{order.total}</p>
                                         </div>
                                         </div>
                                          ))}
        </>
        <button>More (to open order history component)</button> 
    </div>
    </>
  );}


export default prevOrder;
