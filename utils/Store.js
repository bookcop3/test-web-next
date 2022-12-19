import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
export const Store = createContext();
const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], postp: {}, postp2: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          postp: { location: {} },
        },
      };
    case 'CART_CLEAR_ITEMS':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'SAVE_POSTP_NAME':
      return {
        ...state,
        cart: {
          ...state.cart,
          postp: {
            ...state.cart.postp,
            ...action.payload,
          },
        },
      };
    case 'SAVE_POSTP2_NAME':
      return {
        ...state,
        cart: {
          ...state.cart,
          postp2: action.payload,
        },
      };

    default:
      return state;
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
