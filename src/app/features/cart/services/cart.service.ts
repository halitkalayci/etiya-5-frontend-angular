import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // initial value => başlangıç değeri = []
  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  // initial value yok!!
  cartItems2: Subject<CartItem[]> = new Subject<CartItem[]>();
  constructor() {}

  add(cartItem: CartItem) {
    // Sepeti kontrol et, aynı üründen varsa adeti gelen adet kadar arttır.
    // Aynı üründen yoksa direkt ekle.
    // id atama işlemi
    let sameProduct = this.cartItems.value.find(
      (i) => i.product.id == cartItem.product.id
    );
    if (sameProduct) {
      sameProduct.quantity += cartItem.quantity;
      // yeni değerler ile cartItems'i değiştir..
      this.cartItems.next([
        ...this.cartItems.value.filter(
          (i) => i.product.id != cartItem.product.id
        ),
        sameProduct,
      ]);
      return;
    }
    // Gelen yeni ürünü direkt sepete ekle..
    cartItem.id = Math.floor(Math.random() * 9999999);
    this.cartItems.next([...this.cartItems.value, cartItem]);
  }

  remove(id: number) {
    // Gelen id değeri ile cartItem ara, bulursan sil..
    this.cartItems.next(this.cartItems.value.filter((i) => i.id != id));
    // this.cartItems.value sadece ilgili değişkenin anlık değerini okumak için kullanılmalı
  }
}
