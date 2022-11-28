import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
import { validateCustomText, pluralize } from '../utils/helpers';
import CustomMug from '../components/CustomMug';
import { CirclePicker } from 'react-color';

import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

function AreProductsSame(product1, product2) {
  console.log('product one:', product1, 'product two', product2);
  if (
    product1 &&
    product2 &&
    product1.mugColor === product2.mugColor &&
    product1.customizedColor === product2.customizedColor &&
    product1.customText === product2.customText &&
    product1.customFont === product2.customFont
  ) {
    return true;
  } else {
    return false;
  }
}

function CustomizeProduct(item) {
  const [blockPickerColor, setBlockPickerColor] = useState('black');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setconfirmationMessage] = useState('');

  const [newProduct, setNewProduct] = useState({
    mugColor: 'White',
    customizedColor: '',
    customText: '',
    customFont: 'Trebuchet MS',
    count: '',
  });

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const [mugText, setMugText] = useState('');
  const [mugSrc, setMugSrc] = useState('');
  const [mugFont, setMugFont] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [newButton, setNewButton] = useState('');

  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const addToCart = async (product) => {
    const itemInCart = cart.find((cartItem) => {
      return AreProductsSame(cartItem, product);
    });
    dispatch({
      type: ADD_TO_CART,
      product: { ...product },
    });
    idbPromise('cart', 'put', { ...product });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'mugColor') {
      setNewProduct({ ...newProduct, [name]: value });
      setconfirmationMessage('');
      setMugSrc(value);
    } else if (name === 'customText') {
      if (validateCustomText(value)) {
        setNewProduct({ ...newProduct, [name]: value });
        setMugText(value);
        setCharacterCount(value.length);
      }
    } else if (name === 'customFont') {
      setNewProduct({ ...newProduct, [name]: value });
      setMugFont(value);
    } else if (name === 'count') {
      setNewProduct({ ...newProduct, [name]: parseInt(value) });
    } else {
      setNewProduct({ ...newProduct, customizedColor: blockPickerColor });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      !newProduct.customText ||
      !newProduct.customizedColor ||
      !newProduct.count
    ) {
      setErrorMessage(
        'Something is missing. Please review and make sure your custom choices have been selected'
      );
    } else {
      try {
        const { data } = await addProduct({
          variables: { ...newProduct },
        });
        setNewButton(' Create a new mug');
        setconfirmationMessage(
          `${newProduct.count} ${pluralize(
            'mug',
            newProduct.count
          )} added to cart.`
        );
        addToCart(data.addProduct);
        let mugselector = document.getElementById('mugselector');
        let fontselector = document.getElementById('fontselector');
        fontselector.value = 'Trebuchet MS';
        mugselector.value = 'white';
        setBlockPickerColor('black');
        setMugSrc('');
        setMugFont('Trebuchet MS');
        setMugText('');
        setErrorMessage('');
        setCharacterCount('0');
        setNewProduct({
          mugColor: 'white',
          customizedColor: '',
          customText: '',
          customFont: '',
          count: '',
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const clearConfirmation = (event) => {
    event.preventDefault();

    setconfirmationMessage('');
    setNewButton('');
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <h3>customize your creation</h3>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form onSubmit={handleFormSubmit} autoComplete="off">
              <div className="form-group mt-3">
                <label htmlFor="exampleFormControlSelect1">
                  *Pick your mug color (white/black):
                </label>
                <select
                  className="form-control"
                  name="mugColor"
                  id="mugselector"
                  onChange={handleChange}
                  defaultValue="1"
                >
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputEmail1">
                  *Your custom message:
                </label>
                <input
                  name="customText"
                  placeholder="I love coffee & tea"
                  value={newProduct.customText}
                  type="text"
                  className={`form-control ${
                    characterCount === 26 || error ? 'text-danger ' : ''
                  }`}
                  onChange={handleChange}
                />
                <small
                  className={`d-flex justify-content-end ${
                    characterCount === 25 || error ? 'text-danger' : ''
                  }`}
                >
                  max character count: {characterCount}/25
                </small>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputEmail1">
                  *Select a text colour:
                </label>
                <CirclePicker
                  className="pt-3 w-100"
                  name="customizedColor"
                  color={blockPickerColor}
                  onChange={(color) => {
                    setBlockPickerColor(color.hex);
                    setNewProduct({
                      ...newProduct,
                      customizedColor: color.hex,
                    });
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputEmail1">*Select A Font:</label>
                <select
                  id="fontselector"
                  name="customFont"
                  className="form-control"
                  onChange={handleChange}
                  defaultValue="1"
                >
                  <option>Trebuchet MS</option>
                  <option>Amatic SC</option>
                  <option>Bungee Outline</option>
                  <option>Cinzel</option>
                  <option>Cutive Mono</option>
                  <option>Eater</option>
                  <option>Erica One</option>
                  <option>Manrope</option>
                  <option>Monoton</option>
                  <option>Pacifico</option>
                </select>
              </div>
              <div className=" d-flex flex-row my-2 align-items-end">
                <div className="form-group mt-3">
                  <label htmlFor="exampleInputEmail1">*Select quantity:</label>

                  <input
                    className="form-control"
                    placeholder="quantity"
                    value={newProduct.count}
                    name="count"
                    type="number"
                    min="0"
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <button className="btn btn-warning mx-2" type="submit">
                    add to cart
                  </button>
                </div>
              </div>
              <div>
                <p className="text-danger font-italic">{errorMessage}</p>
                <span>{confirmationMessage}</span>
                <span
                  role="button"
                  className="text-primary"
                  onClick={clearConfirmation}
                >
                  {newButton}
                </span>
              </div>
              {error && (
                <div className="text-danger">
                  Something went wrong. To place an order, make sure you are
                  <Link to="/login"> logged in.</Link>
                </div>
              )}
            </form>
          </div>
          <div className="col-md-7">
            <CustomMug
              mugText={mugText}
              mugSrc={mugSrc}
              color={blockPickerColor}
              font={mugFont}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeProduct;
