import { ItemParser } from '../shared/utils/item-parser';
import { Item } from '../shared/interfaces/item.interface';
import { ResponseItems } from '../shared/interfaces/response-items.interface';
import { ItemsExternalService } from './items-external.service';

// Item parser util
const itemParser = ItemParser;

// Items list service
export const list = (like: string): Promise<ResponseItems> => {
  const itemsExternalService: ItemsExternalService = new ItemsExternalService();
  const listItemsRequest = itemsExternalService.listItems(like);

  return new Promise((resolve, reject) => {
    listItemsRequest
      .then((rawItemList: any[]) => {
        const responseItems: ResponseItems = {
          author: {
            name: '',
            lastname: '',
          },
          categories: [],
          items: [],
        };

        const categories: Set<string> = new Set();
        const items: Item[] = rawItemList.map((rawItem: any) => {
          categories.add(rawItem['category_id']);
          return itemParser.RawBaseItemParse(rawItem);
        });

        responseItems.categories = Array.from(categories);
        responseItems.items = items;

        resolve(responseItems);
      })
      .catch((error) => reject(error));
  });
};
