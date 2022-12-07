import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  dateNow: Date = new Date();
  color: string = 'yellow';
  @Input() product!: Product;
  @Output() onAddToCartClick = new EventEmitter<Product>();

  addToCartClick() {
    // Parent componenti uyar!!
    // Event emitter'i triggerla
    // emit et
    this.onAddToCartClick.emit(this.product);
  }
}

// Pipes, built-in pipes, custom pipe oluşturma
// (Süre kalırsa) Attribute directives.
