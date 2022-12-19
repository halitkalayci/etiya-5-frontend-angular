// State'i değiştirecek fonksiyonların tanımlandığı nokta..

import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/features/cart/models/cartItem';

// export => state'i değiştirecek aksiyonu uygulamanın herhangi bir yerinden çağırabilirim

// createAction 1. parametre (string) = "[Cart] Add Item To Cart"
//! unique olmalı!!
export const addItemToCart = createAction(
  '[Cart] Add Item To Cart',
  props<{ cartItem: CartItem }>()
);
/*
addItemToCart(cartItem:CartItem){}
*/

export const removeItemFromCart = createAction(
  '[Cart] Remove Item From Cart',
  props<{ id: number }>()
);
/*
remove(id: number) {}
*/
