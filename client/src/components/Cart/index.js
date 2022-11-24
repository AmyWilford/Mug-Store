// import React, { useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { useLazyQuery } from "@apollo/client";
// // import { QUERY_CHECKOUT } from '../../utils/queries';
// import { idbPromise } from "../../utils/helpers";
// import CartItem from "../CartItem";
// import Auth from "../../utils/auth";
// // import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
// import "font-awesome/css/font-awesome.min.css";

// require('dotenv').config();
// const stripePromise = loadStripe(process.env.STRIPE_PK);

// const Cart = () => {
//   const [state, dispatch] = useStoreContext();
//   const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

//   useEffect(() => {
//     if (data) {
//       stripePromise.then((res) => {
//         res.redirectToCheckout({ sessionId: data.checkout.session });
//       });
//     }
//   }, [data]);

//   useEffect(() => {
//     async function getCart() {
//       const cart = await idbPromise("cart", "get");
//       dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
//     }
//     if (!state.cart.length) {
//       getCart();
//     }
//   }, [state.cart.length, dispatch]);

//   function toggleCart() {
//     dispatch({ type: TOGGLE_CART });
//   }

//   function calculateTotal() {
//     let sum = 0;
//     state.cart.forEach((item) => {
//       sum += item.price * item.purchaseQuantity;
//     });
//     return sum.toFixed(2);
//   }

//   function submitCheckout() {
//     const productIds = [];

//     state.cart.forEach((item) => {
//       for (let i = 0; i < item.purchaseQuantity; i++) {
//         productIds.push(item._id);
//       }
//     });

//     getCheckout({
//       variables: { products: productIds },
//     });
//   }

//   if (!state.cartOpen) {
//     return (
//       <div className="cart-closed" onClick={toggleCart}>
//         <i className="fa-regular fa-basket-shopping"></i>
//       </div>
//     );
//   }

//   return(
//     <div className="cart">
//         <div className="close" onClick={toggleCart}>
//             x
//         </div>
//         <p>your cart:</p>
//         {state.cart.length ? (
//         <div>
//         {state.cart.map((item)=>(
//             <CartItem key={item._id} item={item}/>
//         ))}

//         <div> Total: ${calculateTotal()}
//         <button onClick={submitCheckout}>Checkout</button>
//         </div>
//         </div>
//         ) : (
//             <div>Your cart is empty</div>
//         )
//     </div>
//   )

// export default Cart;
