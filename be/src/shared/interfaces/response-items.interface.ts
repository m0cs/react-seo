import { Author } from './author.interface';
import { BaseItem } from './item.interface';
import { Category } from './category.interface';

export interface ResponseItems {
  author: Author;
  categories: Category[];
  items: BaseItem[];
}
