import { Image } from './image.type';

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image: Image;
  categoryId: string;
}

export interface ProductDetail {
  product: Product;
  quantity: number;
}
