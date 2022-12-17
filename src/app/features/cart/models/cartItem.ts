import { Product } from '../../products/models/product';

export interface CartItem {
  id?: number;
  product: Product;
  quantity: number;
}
