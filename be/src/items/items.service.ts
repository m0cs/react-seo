import { ItemParser } from '../shared/utils/item-parser';
import { Item } from '../shared/interfaces/item.interface';
import { ResponseItems } from '../shared/interfaces/response-items.interface';
import { ItemsExternalService } from './items-external.service';
import { RawResponseList } from '../shared/interfaces/raw-response-list.interface';
import { Category } from '../shared/interfaces/category.interface';
import { Utils } from '../shared/utils/utils';

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
        // not classified response
        if (rawItemList.availableCategories && rawItemList.availableCategories.length) {
          // get category with most results
          const availableCategories: Category[] = rawItemList.availableCategories;
          const COMPARTOR_KEY: string = 'results';
          let category: Category = Utils.findHighestValue(availableCategories, COMPARTOR_KEY);
          const listItemsByCategory = itemsExternalService.listItems(like, category.id);
          console.log(category);

          listItemsByCategory
            .then((response) => {
              const items: Item[] = response.items.map((rawItem: any) => {
                return itemParser.RawBaseItemParse(rawItem);
              });
              responseItems.categories = response.categories;
              responseItems.items = items;

              resolve(responseItems);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const items: Item[] = rawItemList.items.map((rawItem: any) => {
            return itemParser.RawBaseItemParse(rawItem);
          });
          responseItems.categories = rawItemList.categories;
          responseItems.items = items;

          resolve(responseItems);
        }
      })
      .catch((error) => reject(error));
  });
};
