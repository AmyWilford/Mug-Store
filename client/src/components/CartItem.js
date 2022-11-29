import React from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { REMOVE_FROM_CART } from '../utils/actions'; //import correct mutations
import { idbPromise, pluralize } from '../utils/helpers';
import styled from 'styled-components';

// Styled elements for cart item styling
const StyledItem = styled.div`
  padding: 1.25rem;
  margin: 1rem;
`;
const Remove = styled.span`
  color: lightgrey;
  &:hover {
    color: grey;
  }
`;
const ItemTitle = styled.span`
  text-transform: uppercase;
  padding-bottom: 1rem;
`;

// Declart Cart Item with inputted item as argument
const CartItem = ({ item }) => {
  const color = item.customizedColor;
  const [, dispatch] = useStoreContext();

  // Function to remove item from the cart
  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise('cart', 'delete', { ...item });
  };

  // Render individual cart items
  return (
    <div className="flex-row bg-light">
      <StyledItem key={item._id}>
        <div className="d-flex flex-row justify-content-between">
          <ItemTitle>
            {item.count} {item.mugColor} custom {pluralize('mug', item.count)}
          </ItemTitle>
          <Remove
            role="button"
            aria-label="remove"
            onClick={() => removeFromCart(item)}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </Remove>
        </div>
        <div className="row d-flex align-items-end">
          <div className="col-6">
            <div>custom message:</div>
            <div style={{ color: color }}>{item.customText}</div>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div>${(item.price * item.count).toFixed(2)}</div>
          </div>
        </div>
      </StyledItem>
    </div>
  );
};

export default CartItem;
