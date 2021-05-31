import { Price } from './price.interface';

export interface BaseItem {
  id?: string;
  title?: string;
  price?: Price;
  picture?: string;
  condition?: string;
  free_shipping?: boolean;
  // extra field
  category_id?: string;
}

export interface Item extends BaseItem {
  sold_quantity?: number;
  description?: string;
}
