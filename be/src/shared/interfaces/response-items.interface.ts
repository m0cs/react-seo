import { Author } from './author.interface';
import { BaseItem } from './item.interface';

export interface ResponseItems {
  author: Author;
  categories: string[];
  items: BaseItem[];
}
