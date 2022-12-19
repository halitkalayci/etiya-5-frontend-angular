// actions'da tanımlanmış fonksiyonların içerisinin doldurulduğu kısım..

import { createReducer, on } from '@ngrx/store';
import { addItemToCart, removeItemFromCart } from './cart.actions';
import { CartItem } from 'src/app/features/cart/models/cartItem';

// initial state => hiç bir işlem yapılmadığında store'da değerin başlangıç değeri
// = []

const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addItemToCart, (state: CartItem[], action: CartItem) => {
    // store'daki addItemToCart çağırıldında ne istersen yap..
    console.log(state, action);
    // state'e yeni gelen action'ı ekle ve yeni state'i dön..
    // eğer state'de aynı id'li ürün varsa quantity arttır..
    let sameProduct = state.find((p) => p.product.id == action.product.id);
    if (sameProduct) {
      return [
        ...state.filter((c) => c.id != sameProduct?.id),
        { ...sameProduct, quantity: sameProduct.quantity + action.quantity },
      ];
    }
    // READ-ONLY
    return [...state, { id: Math.floor(Math.random() * 9999999), ...action }];
  }),
  on(removeItemFromCart, (state, action) => {
    return state.filter((i) => i.id != action.id);
  })
);
