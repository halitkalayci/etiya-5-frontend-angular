import { cartReducer } from './cart/cart.reducer';

// Store'da değer güncelleyen tüm reducerları tanımla..

export const sharedReducers = {
  cart: cartReducer,
};
