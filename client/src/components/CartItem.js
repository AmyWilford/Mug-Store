import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions"; //import correct mutations
import { idbPromise } from "../utils/helpers";
import styled from "styled-components";

const StyledItem = styled.div`
  font-size: 0.8rem;
  border-bottom: 1px solid grey;
`;
const Remove = styled.div`
  color: #d5f0f1;
  &:hover {
    color: pink;
  }
`;

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <StyledItem key={item.id}>
        <div className="row">
          <div className="col-1">
            <Remove
              role="button"
              aria-label="remove"
              onClick={() => removeFromCart(item)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </Remove>
          </div>
          <div className="col-10">
            <p>
              mug color: {item.mugColor} | text color:
              {item.customizedColor}
            </p>

            <p>custom message:{item.customText}</p>
            <p>
              price x {item.count} = $ {item.price}
            </p>
          </div>
        </div>
      </StyledItem>
    </div>
  );
};

export default CartItem;
