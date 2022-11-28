import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import CustomMug from '../components/CustomMug';
// import "font-awesome/css/font-awesome.min.css";

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

// import { HexColorPicker } from 'react-colorful';
// import 'react-colorful/dist/index.css';

function AreProductsSame(product1, product2) {
  if (
    product1.mugColor === product2.mugColor &&
    product1.customizedColor === product2.customizedColor &&
    product1.customText === product2.customText &&
    product1.imageIcon === product2.imageIcon
  ) {
    return true;
  } else {
    return false;
  }
}

function CustomizeProduct(item) {
  // const [color, setColor] = useState("#aabbcc");dw

  const [newProduct, setNewProduct] = useState({
    mugColor: '',
    customizedColor: '',
    customText: '',
    imageIcon: '',
    count: '',
  });

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const [mugText, setMugText] = useState('Your Text');
  const [mugSRC, setMugSrc] = useState('../assets/whitemug.jpg');

  const [state, dispatch] = useStoreContext();

  const { cart } = state;
  const addToCart = async (product) => {
    const itemInCart = cart.find((cartItem) => {
      return AreProductsSame(cartItem, product);
    });

    if (itemInCart) {
      dispatch({
        products: [
          {
            type: UPDATE_CART_QUANTITY,
            _id: itemInCart._id,
            count: parseInt(itemInCart.count) + 1,
          },
        ],
      });
      idbPromise('cart', 'put', {
        products: [
          {
            ...itemInCart,
            count: parseInt(itemInCart.count) + 1,
          },
        ],
      });
    } else {
      dispatch({
        products: [
          {
            type: ADD_TO_CART,
            product: { ...product, count: 1 },
          },
        ],
      });
      idbPromise('cart', 'put', { products: [{ ...product, count: 1 }] });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'mugColor') {
      if (value === 'black') {
        setMugSrc('../assets/blackmug.jpg');
      }

      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === 'customizedColor') {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === 'customText') {
      setNewProduct({ ...newProduct, [name]: value });
      setMugText(value);
      console.log(newProduct);
    }
    if (name === 'imageIcon') {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    }
    if (name === 'count') {
      setNewProduct({ ...newProduct, [name]: parseInt(value) });
      console.log(newProduct);
    }
    console.log(newProduct);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const temp = await addProduct({
        variables: { ...newProduct },
      });

      console.log(temp);
      addToCart(temp.data.addProduct);

      setNewProduct({
        mugColor: '',
        customizedColor: '',
        customText: '',
        imageIcon: '',
        count: '',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // test
  return (
    <div>
      <Link to="/profile">Back to profile</Link>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div>Customize Your Mug</div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">
                  Pick your mug color
                </label>
                <select
                  className="form-control"
                  name="mugColor"
                  onChange={handleChange}
                  defaultValue="1"
                >
                  <option value="1">Choose...</option>
                  <option value="../assets/whitemug.jpg">White</option>
                  <option value="./assets/blackmug.jpg">Black</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Write out your customized Text
                </label>
                <input
                  className="form-control"
                  name="customText"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Pick your color text</label>
                <input
                  className="form-control"
                  name="customizedColor"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Select an image (optional)
                </label>

                <select
                  className="form-control"
                  placeholder="imageIcon"
                  name="imageIcon"
                  type="text"
                  onChange={handleChange}
                  defaultValue="1"
                >
                  <option value="1">Choose...</option>
                  <option value="image1"></option>
                  <option value="image2">Image Two</option>
                  <option value="image3">image Three</option>
                  <option value="image4">Image Four</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">How Many Mugs?</label>

                <select
                  className="form-control"
                  placeholder="quantity"
                  name="count"
                  type="number"
                  onChange={handleChange}
                  defaultValue="1"
                >
                  <option value="1">Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="3">Four</option>
                  <option value="3">Five</option>
                </select>
              </div>
              <div>
                <button className="btn btn-primary" type="submit">
                  Create My Mug
                </button>
              </div>
              {error && <div>Something went wrong...</div>}
            </form>
          </div>
          <div className="col-sm-6">
            {/* <div>{mugText}</div> */}
            <CustomMug mugText={mugText} mugSrc={mugSRC} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeProduct;
