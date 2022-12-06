import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterProductByPrice',
})
export class FilterProductByPricePipe implements PipeTransform {
  transform(
    products: Product[],
    price: number,
    operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq'
  ): Product[] {
    if (price <= 0) return products;
    let filteredProducts: Product[] = products;

    //filteredProducts => içini doldurma
    switch (operator) {
      case 'eq':
        filteredProducts = products.filter((p) => p.unitPrice == price);
        break;
      case 'lte':
        filteredProducts = products.filter((p) => p.unitPrice <= price);
        break;
      case 'gte':
        filteredProducts = products.filter((p) => p.unitPrice >= price);
        break;
      case 'gt':
        filteredProducts = products.filter((p) => p.unitPrice > price);
        break;
      case 'lt':
        filteredProducts = products.filter((p) => p.unitPrice < price);
        break;
    }

    return filteredProducts;
  }
}
