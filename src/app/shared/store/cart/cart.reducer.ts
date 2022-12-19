// actions'da tanımlanmış fonksiyonların içerisinin doldurulduğu kısım..

import { createReducer, on } from '@ngrx/store';
import { addItemToCart, removeItemFromCart } from './cart.actions';
import { CartItem } from 'src/app/features/cart/models/cartItem';

// initial state => hiç bir işlem yapılmadığında store'da değerin başlangıç değeri
// = []

const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addItemToCart, (state, action) => {
    // store'daki addItemToCart çağırıldında ne istersen yap..
    return state;
  }),
  on(removeItemFromCart, (state, action) => {
    return state;
  })
);
