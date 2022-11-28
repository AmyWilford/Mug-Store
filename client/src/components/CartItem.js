import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions"; //import correct mutations
import { idbPromise, pluralize } from "../utils/helpers";
import styled from "styled-components";

const StyledItem = styled.div`
  border-bottom: 1px solid grey;
  padding: 1.25rem;
  line-height: 2rem;
`;
const Remove = styled.span`
  color: lightgrey;
  &:hover {
    color: grey;
  }
`;
const ItemTitle = styled.span`
  text-transform: uppercase;
`;

const CartItem = ({ item }) => {
  const color = item.customizedColor;
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
      <StyledItem key={item._id}>
        <div className="d-flex flex-row justify-content-between">
          <ItemTitle>
            {item.count} {item.mugColor} custom {pluralize("mug", item.count)}
          </ItemTitle>{" "}
          <Remove
            role="button"
            aria-label="remove"
            onClick={() => removeFromCart(item)}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </Remove>
        </div>

        <div className="d-flex flex-row">
          <div>
            custom text:{" "}
            <span style={{ color: color, fontStyle: "italic" }}>
              {item.customText}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <p>order total: $ {item.price}</p>
        </div>
      </StyledItem>
    </div>
  );
};

export default CartItem;
