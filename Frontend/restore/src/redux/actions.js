import axios from 'axios';
import {
  ADD_FROM_DB,
  ADD_TO_CART,
  CLEAN_CART,
  REMOVE_FROM_CART,
} from './action-types';

//crear accion que despache el id y agregar uno, y otra de quitar uno.
//dentro de esas chequear si esta logueado, si lo esta ir a logged sumar o restar.
//va a haber que hacer una api para eso

export const addToCart = (productId, userId, userId2, precio, oferta = 0) => {
  const newProduct = {
    productId,
    cantidad: 1,
    _id: userId || userId2,
    precio,
    oferta,
  };
  let storedCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  if (!storedCart.some((storedItem) => storedItem.productId === productId)) {
    storedCart = [...storedCart, newProduct];
  }
  localStorage.setItem('cart', JSON.stringify(storedCart));
  if (userId || userId2) return loggedAddToCart(newProduct, userId, userId2);

  return {
    type: ADD_TO_CART,
    payload: newProduct,
  };
};

export const removeFromCart = (productId, userId, userId2) => {
  let storedCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  storedCart = storedCart.filter(
    (localStorageItem) => localStorageItem.productId !== productId
  );
  localStorage.setItem('cart', JSON.stringify(storedCart));
  if (userId || userId2)
    return loggedRemoveFromCart(productId, userId, userId2);
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const addFromDatabase = (localItems, userId, userId2) => {
  return async (dispatch) => {
    try {
      const { data: dbItems } = await axios.get(
        `https://re-store.onrender.com/carrito`,
        {
          params: { userId: userId || userId2 },
        }
      );
      let mergedCart = [...localItems, ...dbItems];
      mergedCart = mergedCart.reduce((uniqueItems, item) => {
        // Verificar si el ID del item actual ya existe en el array uniqueItems
        const exists = uniqueItems.some(
          (uniqueItem) => uniqueItem?.productId === item?.productId
        );

        // Si el ID no existe, agregar el item al array uniqueItems
        if (!exists) {
          uniqueItems.push(item);
        }

        return uniqueItems;
      }, []);

      mergedCart.forEach(async (cartItem) => {
        try {
          const { data } = await axios.post(
            `https://re-store.onrender.com/carrito`,
            {
              productId: cartItem.productId,
              userId: userId || userId2,
              precio: cartItem.precio,
              oferta: cartItem.oferta,
            }
          );
        } catch (error) {}
      });

      localStorage.setItem('cart', JSON.stringify(mergedCart));
      return dispatch({
        type: ADD_FROM_DB,
        payload: mergedCart,
      });
    } catch (error) {}
  };
};

const loggedAddToCart = (newProduct, userId, userId2) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `https://re-store.onrender.com/carrito`,
        {
          productId: newProduct.productId,
          userId: userId || userId2,
          precio: newProduct.precio,
          oferta: newProduct.oferta,
        }
      );
      return dispatch({
        type: ADD_TO_CART,
        payload: newProduct,
      });
    } catch (error) {}
  };
};

const loggedRemoveFromCart = (productId, userId, userId2) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        'https://re-store.onrender.com/carrito',
        {
          data: {
            productId: productId,
            userId: userId || userId2,
          },
        }
      );
      return dispatch({ type: REMOVE_FROM_CART, payload: productId });
    } catch (error) {}
  };
};
export const cleanCart = (userId, userId2) => {
  localStorage.removeItem('cart');
  const user = userId || userId2;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        'https://re-store.onrender.com/carrito/checkout',
        // 'http://localhost:3001/carrito/checkout',
        {
          data: {
            userId: user,
          },
        }
      );
      dispatch({ type: CLEAN_CART });
    } catch (error) {
      console.log(error);
    }
  };
};
