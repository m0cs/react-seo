import { Item, BaseItem } from '../interfaces/item.interface';
import { Price } from '../interfaces/price.interface';
import { Category } from '../interfaces/category.interface';

// This util class parses MELI json to a kwown one.
export class ItemParser {
  public constructor() {}

  public static RawItemParse(rawItem: any, rawItemDescription: any): Item {
    let item: Item = {
      ...this.RawBaseItemParse(rawItem),
      sold_quantity: rawItem['sold_quantity'],
      ...this.RawItemDescriptionParse(rawItemDescription),
    };

    return item;
  }

  // Parse a MELI Item JSON into a BaseItem.
  public static RawBaseItemParse(rawItem: any): BaseItem {
    rawItem = rawItem || {};
    rawItem['shipping'] = rawItem['shipping'] || {};

    let baseItem: BaseItem = {
      id: rawItem['id'],
      title: rawItem['title'],
      price: this.RawItemPriceParse(rawItem),
      picture: rawItem['thumbnail'],
      condition: rawItem['condition'],
      free_shipping: rawItem['shipping']['free_shipping'],
      category_id: rawItem['category_id'],
    };

    return baseItem;
  }

  // Parse a MELI Item description JSON into an empty Item with description.
  public static RawItemDescriptionParse(rawItem: any): Item {
    rawItem = rawItem || {};
    const item: Item = {
      description: rawItem['plain_text'],
    };

    return item;
  }

  // Private tool.
  // Parse a MELI Item price JSON into a Price.
  private static RawItemPriceParse(rawItem: any): Price {
    rawItem = rawItem || {};
    rawItem['price'] = rawItem['price'] || {};

    const decimals: number = Math.round(((rawItem['price'] * 10) % 10) * 10);

    const price: Price = {
      currency: rawItem['currency_id'] || '0',
      amount: rawItem['price'] || 0,
      decimals: decimals || 0,
    };

    return price;
  }

  public static RawItemParseCategories(rawItem: any) {
    rawItem = rawItem || {};
    rawItem['categories'] = rawItem['categories'] || {};

    const CATEGORIES_VALUES: string = 'path_from_root';
    const category = rawItem['categories'][0] || [];
    const categories = category[CATEGORIES_VALUES];
    return categories.map((c: Category) => c.name);
  }
}
