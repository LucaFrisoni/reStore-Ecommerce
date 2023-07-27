import {
  ADD_FROM_DB,
  ADD_TO_CART,
  CLEAN_CART,
  REMOVE_FROM_CART,
} from './action-types';

let storedCart = [];

if (typeof window !== 'undefined') {
  storedCart = localStorage.getItem('cart')
    ? {
        cart: JSON.parse(localStorage.getItem('cart')),
      }
    : {
        cart: [],
      };
}

const initialState = storedCart;

export const reducer = (state = initialState, action) => {
  //crear dos actions que hagan un map de todo el cart, y el que tiene mismo id que lo retorne con una cantidad +/-
  switch (action.type) {
    case ADD_TO_CART:
      if (
        state.cart.some((item) => item.productId === action.payload.productId)
      )
        return {
          ...state,
          cart: state.cart,
        };
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => {
          return cartItem.productId !== action.payload;
        }),
      };
    case ADD_FROM_DB:
      return {
        ...state,
        cart: action.payload,
      };
    case CLEAN_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
