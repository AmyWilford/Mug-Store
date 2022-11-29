import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import "font-awesome/css/font-awesome.min.css";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";

require("dotenv").config();

const stripePromise = loadStripe(
  "pk_test_51M7jaMGxD4OrUtXm9cQzCEcbza6gddGVeNiLI1aiDbwEuKAAhYbQghQtrrplOt3LhKE7WQpXaviQOnnbpwB6n9Bw009o7VZavU"
);
// Establish Cart function
function Cart() {
  // declare state and dispatch from useStoreContext imported from global tate
  const [state, dispatch] = useStoreContext();
  // Establish get checkeout function from query
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // Redirect to stripe on checkout
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);
// Function to togglecart
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
// Function to calculate total of cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += (item.price* item.count);
    });
    return sum.toFixed(2);
  }

  // Function to submit Checkout and push items to stripe 
  async function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.count; i++) {
        productIds.push(item._id);
      }
    });

    await getCheckout({
      variables: { products: productIds },
    });

    console.log(data);
  }
// If the cart is closed - display cart icon and text
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        <small> Cart</small>
      </div>
    );
  }
// If cart is open show full cart with populated cart items
  return (
    <div className="cart p-4">
      <div className="close text-secondary" onClick={toggleCart}>
        close cart
      </div>
      <div className="row py-4 mt-2">
        <h5>YOUR CART:</h5>
      </div>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
          <h5 className="text-right">CART TOTAL: ${calculateTotal()}</h5>
          {Auth.loggedIn() ? (
            <button
              onClick={submitCheckout}
              className="btn btn-primary mt-2 w-100"
            >
              checkout
            </button>
          ) : (
            <span>(log in to check out)</span>
          )}{" "}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
