import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterProduct',
})
export class FilterProductPipe implements PipeTransform {
  transform(products: Product[], name: string): Product[] {
    let filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredProducts;
  }
}
