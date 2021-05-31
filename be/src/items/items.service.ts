import { ItemParser } from '../shared/utils/item-parser';
import { Item } from '../shared/interfaces/item.interface';
import { ResponseItems } from '../shared/interfaces/response-items.interface';
import { ItemsExternalService } from './items-external.service';
import { RawResponseList } from '../shared/interfaces/raw-response-list.interface';

// Item parser util
const itemParser = ItemParser;

// Items list service
export const list = (like: string): Promise<ResponseItems> => {
  const itemsExternalService: ItemsExternalService = new ItemsExternalService();
  const listItemsRequest = itemsExternalService.listItems(like);

  return new Promise((resolve, reject) => {
    listItemsRequest
      .then((rawItemList: RawResponseList) => {
        const responseItems: ResponseItems = {
          author: {
            name: '',
            lastname: '',
          },
          categories: [],
          items: [],
        };
        const items: Item[] = rawItemList.items.map((rawItem: any) => {
          return itemParser.RawBaseItemParse(rawItem);
        });
        responseItems.categories = rawItemList.categories;
        responseItems.items = items;

        resolve(responseItems);
      })
      .catch((error) => reject(error));
  });
};
