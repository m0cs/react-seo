import { Item } from './item.interface';
import { Author } from './author.interface';

export interface ResponseItem {
  author: Author;
  item: Item;
}
