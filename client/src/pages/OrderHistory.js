import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ORDER, QUERY_PRODUCT } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  
  if (data) {
    user = data.user;
  }
console.log(user)
console.log("NOW THE PRODUCTS")
console.log(user.orders)
const userOrders = []
user.orders.map(
  ({ _id:_id }) => (
userOrders.push(_id)
    ))
  console.log(userOrders)

// const orderQuery(_id) = useQuery(QUERY_ORDER,{
//   variables:{_id:_id}
// })

// user.orders.map((order) => (
//   const [ products ] = useQuery(QUERY_ORDER,{
//     variables : {_id: order._id}
//         })
//         console.log(products)
// ))

  return (
    <div className="main-content d-flex ">
      <div className=" ui segment w-75 raised m-auto mt-5 animate__animated animate__fadeInDown">
        <Link to="/profile">← Back to Dashboard</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
               
                <div className="flex-column">
                <h4>Order # {order._id} </h4>
                  {order.products.map(
                    ({ _id, mugColor, customText, count, price }, index) => (
                      <div key={index} className="card px-1 py-1">
                        <p>Mug Colour: {mugColor} </p>
                        <p>Custom Text: {customText} </p>
                        <p>Quantity: {count} </p>
                        <p>Total Order Price: ${price}</p>
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


