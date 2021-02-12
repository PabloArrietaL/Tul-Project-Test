import { ProductDetail } from './product.type';

export interface Checkout {
  id?: string;
  total: number;
  detail: ProductDetail[];
}
