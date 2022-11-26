import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
// import { useStoreContext } from "../utils/GlobalState";
import { validateCustomText } from "../utils/helpers";
import CustomMug from "../components/CustomMug";
import { CirclePicker } from "react-color";
import "font-awesome/css/font-awesome.min.css";

const icons = [
  {
    id: 1,
    value: "basket",
    className: "fa fa-2x fa-graduation-cap",
  },
  {
    id: 2,
    value: "one",
    className: "fa fa-2x fa-snowflake-o",
  },
  {
    id: 3,
    value: "two",
    className: "fa fa-2x fa-lightbulb-o",
  },
  {
    id: 4,
    value: "three",
    className: "fa fa-2x fa-heart-o",
  },
  {
    id: 5,
    value: "four",
    className: "fa fa-2x fa-bicycle",
  },
  {
    id: 6,
    value: "five",
    className: "fa fa-2x fa-thumbs-o-up",
  },
  {
    id: 7,
    value: "five",
    className: "fa fa-2x fa-mars",
  },

  {
    id: 7,
    value: "five",
    className: "fa fa-2x fa-genderless",
  },
  {
    id: 9,
    value: "five",
    className: "fa fa-2x fa-venus",
  },
  {
    id: 10,
    value: "five",
    className: "fa  fa-2x fa-transgender",
  },
];

function CustomizeProduct(item) {
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
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
    } else if (name === "imageIcon") {
      console.log("I am the image icon");
      console.log(value);
      setNewProduct({ ...newProduct, [name]: value });
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
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h5 className="display-6">customize your creation</h5>
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
                  type="text"
                  className={`m-0 ${
                    characterCount === 25 || error
                      ? "text-danger form-control"
                      : "form-control"
                  }`}
                  onChange={handleChange}
                />
                <p>{errorMessage}</p>
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputEmail1">Pick your color text:</label>
                <CirclePicker
                  className="pt-3"
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
                <div name="imageIcon">
                  {/* <select> */}
                  {icons.map((icon) => (
                    <button className="btn">
                      <i
                        key={icon.key}
                        className={icon.className}
                        name="imageIcon"
                        value={icon.value}
                        onChange={handleChange}
                      ></i>
                    </button>
                  ))}
                  {/* </select> */}
                </div>

                {/* <option value="afont">Icon one</option>
                  <option value="font1">Icon two</option>
                  <option value="font2">Icon three</option>
                  <option value="font3">Icon four</option> */}
              </div>
              <div className="row m-2 align-items-end">
                <div className="col-6">
                  <div className="form-group mt-3">
                    <label for="exampleInputEmail1">How Many Mugs?</label>

                    <select
                      className="form-control"
                      placeholder="quantity"
                      name="count"
                      onChange={handleChange}
                    >
                      <option selected>select...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <button className="btn btn-primary" type="submit">
                      add to cart
                    </button>
                  </div>
                </div>
              </div>

              <p>{confirmationMessage}</p>
              {error && <div>Something went wrong...</div>}
            </form>
          </div>
          <div className="col-md-7">
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
