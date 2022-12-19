import { CartItem } from './../../features/cart/models/cartItem';
import { cartReducer } from './cart/cart.reducer';

// Store'da değer güncelleyen tüm reducerları tanımla..

export const sharedReducers = {
  cart: cartReducer,
};

// Store'daki tüm initial stateleri tek bir objede tanımla..

export interface SharedState {
  cart: CartItem[];
}
