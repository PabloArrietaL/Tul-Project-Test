import { Image } from './image.type';

export interface Product {
  name: string;
  description?: string;
  price: number;
  image: Image;
}
