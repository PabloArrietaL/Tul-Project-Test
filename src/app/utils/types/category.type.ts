import { Image } from './image.type';

export interface Category {
  id?: string;
  name: string;
  image: Image;
}

export interface CategoryFile {
  name: string;
  image: string;
  file: File;
}
