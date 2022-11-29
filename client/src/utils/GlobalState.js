import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

// Set storeContext and establish StoreContext provider
const StoreContext = createContext();
const { Provider } = StoreContext;

// Declare StateProvider and values
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
