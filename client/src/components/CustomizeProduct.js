import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
// import { useStoreContext } from "../utils/GlobalState";
import { validateCustomText } from "../utils/helpers";
import CustomMug from "../components/CustomMug";
import { CirclePicker } from "react-color";

function CustomizeProduct(item) {
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
  const [errorMessage, setErrorMessage] = useState("");

  const [newProduct, setNewProduct] = useState({
    mugColor: "",
    customizedColor: "",
    customText: "",
    imageIcon: "",
    count: "",
  });

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const [mugText, setMugText] = useState("Your Text");
  const [mugSrc, setMugSrc] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "mugColor") {
      setNewProduct({ ...newProduct, [name]: value });
      setMugSrc(value);
      console.log(newProduct);
    } else if (name === "customText") {
      console.log("validate custom text", validateCustomText(value));
      if (!validateCustomText(value)) {
        setErrorMessage("Your text is too long");
      } else {
        setNewProduct({ ...newProduct, [name]: value });
        setMugText(value);
        setCharacterCount(value.length);
        console.log(newProduct);
      }
    }
    // if (name === "customText" && value.length > 27) {
    //   setNewProduct({ ...newProduct, [name]: value });
    // }
    else if (name === "imageIcon") {
      setNewProduct({ ...newProduct, [name]: value });
      console.log(newProduct);
    } else if (name === "count") {
      setNewProduct({ ...newProduct, [name]: parseInt(value) });
      console.log(newProduct);
    } else {
      console.log("this is working");
      setNewProduct({ ...newProduct, customizedColor: blockPickerColor });
      console.log(blockPickerColor);
      console.log(newProduct);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("I am working");
    try {
      const { data } = await addProduct({
        variables: { ...newProduct },
      });
      console.log(newProduct);
      setNewProduct({
        mugColor: "",
        customizedColor: "",
        customText: "",
        imageIcon: "",
        count: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Link to="/profile">Back to profile</Link>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div>Customize Your Mug</div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label for="exampleFormControlSelect1">
                  Pick your mug color
                </label>
                <select
                  className="form-control"
                  name="mugColor"
                  onChange={handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">
                  Write out your customized Text
                </label>
                <input
                  name="customText"
                  type="text"
                  className={`m-0 ${
                    characterCount === 27 || error
                      ? "text-danger form-control"
                      : "form-control"
                  }`}
                  onChange={handleChange}
                />
                <p>{errorMessage}</p>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Pick your color text</label>
                <CirclePicker
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
              <div className="form-group">
                <label for="exampleInputEmail1">Pick an Icon (optional)</label>
                <select
                  className="form-control"
                  placeholder="imageIcon"
                  name="imageIcon"
                  type="text"
                  onChange={handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="afont">Icon one</option>
                  <option value="font1">Icon two</option>
                  <option value="font2">Icon three</option>
                  <option value="font3">Icon four</option>
                </select>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">How Many Mugs?</label>

                <select
                  className="form-control"
                  placeholder="quantity"
                  name="count"
                  type="number"
                  onChange={handleChange}
                >
                  <option selected>Choose...</option>
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
            <CustomMug
              mugText={mugText}
              mugSrc={mugSrc}
              color={blockPickerColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeProduct;
