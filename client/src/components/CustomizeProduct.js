import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import { validateCustomText } from "../utils/helpers";
import CustomMug from "../components/CustomMug";
import { CompactPicker } from "react-color";

function CustomizeProduct(item) {
  const [blockPickerColor, setBlockPickerColor] = useState("black");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setconfirmationMessage] = useState("");

  const [newProduct, setNewProduct] = useState({
    mugColor: "",
    customizedColor: "",
    customText: "",
    imageIcon: "",
    count: "",
  });

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const [mugText, setMugText] = useState("");
  const [mugSrc, setMugSrc] = useState("");
  const [mugFont, setMugFont] = useState("Trebuchet MS");
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "mugColor") {
      setNewProduct({ ...newProduct, [name]: value });
      setMugSrc(value);
      console.log(newProduct);
    } else if (name === "customText") {
      if (validateCustomText(value)) {
        setNewProduct({ ...newProduct, [name]: value });
        setMugText(value);
        setCharacterCount(value.length);
        console.log(newProduct);
      }
    } else if (name === "imageIcon") {
      console.log("I am the image icon");
      console.log(value);
      setNewProduct({ ...newProduct, [name]: value });
      setMugFont(value);
      console.log(newProduct);
    } else if (name === "count") {
      setNewProduct({ ...newProduct, [name]: parseInt(value) });
      console.log(newProduct);
    } else {
      setNewProduct({ ...newProduct, customizedColor: blockPickerColor });
      console.log(blockPickerColor);
      console.log(newProduct);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProduct({
        variables: { ...newProduct },
      });
      console.log(newProduct);
      setconfirmationMessage(
        "Great Choice! Your selection has been added to your cart"
      );
      setNewProduct({
        mugColor: "",
        customizedColor: "",
        customText: "",
        imageIcon: "",
        count: "",
      });

      setBlockPickerColor("black");
      setMugSrc("");
      setMugFont("Trebuchet MS");
      setMugText("");
      setErrorMessage("");
      setCharacterCount("0");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <h5 className="display-6">customize your creation</h5>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group mt-3">
                <label for="exampleFormControlSelect1">
                  Pick your mug color
                </label>
                <select
                  className="form-control"
                  name="mugColor"
                  onChange={handleChange}
                >
                  <option selected>select...</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputEmail1">
                  Write out your customized Text
                </label>
                <input
                  name="customText"
                  placeholder="your custom text"
                  value={newProduct.customText}
                  type="text"
                  className={`form-control ${
                    characterCount === 26 || error ? "text-danger " : ""
                  }`}
                  onChange={handleChange}
                />
                <small
                  className={`d-flex justify-content-end ${
                    characterCount === 25 || error ? "text-danger" : ""
                  }`}
                >
                  Character Count: {characterCount}/25
                </small>
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputEmail1">Pick your color text:</label>
                <CompactPicker
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
                <label for="exampleInputEmail1">Pick an Icon (optional)</label>
                <select
                  name="imageIcon"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="Trebuchet MS">Trebuchet</option>
                  <option value="Amatic SC">Amatic SC</option>
                  <option value="Bungee Outline">Bungee Outline</option>
                  <option value="Cinzel">Cinzel</option>
                  <option value="Cutive Mono">Cutive Mono</option>
                  <option value="Eater">Eater</option>
                  <option value="Erica One">Erica One</option>
                  <option value="Manrope">Manrope</option>
                  <option value="Monoton">Monoton</option>
                  <option value="Pacifico">Pacifico</option>
                </select>
              </div>
              <div className=" d-flex flex-row my-2 align-items-end">
                <div className="form-group mt-3">
                  <label for="exampleInputEmail1">How Many Mugs?</label>

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
                  <button className="btn btn-primary mx-2" type="submit">
                    add to cart
                  </button>
                </div>
              </div>

              <p>{confirmationMessage}</p>
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
