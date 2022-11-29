import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations'; 
import { idbPromise } from '../utils/helpers';

// Declare success component
function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  // Get items form cart and save to order - empty cart once order is processed
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // redirect to userprofile after payment compelte
      setTimeout(() => {
        window.location.assign('/profile');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  // Render success message 
  return (
    <div className="main-content d-flex ">
      <div className=" ui raised segment m-auto m-5 text-center mt-4">
        <h5 className="display-6">Cheers!</h5>
        <h5>
          We cannot <i>espresso</i> how much we appreciate your business.
        </h5>
        <img
          src="../assets/images/cheers.png"
          className="w-50"
          alt="coffee cups cheersing"
        ></img>
        <p>Please keep an eye out on your email for your order confirmation.</p>
        <p>Hang tight - we're redirecting you to your profile dashboard.</p>
      </div>
    </div>
  );
}

export default Success;
