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

  const prepareResponse = (response?: RawResponseList): ResponseItems => {
    const responseJson: ResponseItems = {
      author: {
        name: 'Pablo',
        lastname: 'de Sosa',
      },
      categories: [],
      items: [],
    };

    if (!response) return responseJson;

    const items: Item[] = response.items.map((rawItem: any) => {
      return itemParser.RawBaseItemParse(rawItem);
    });
    // Parse categories from ML
    responseJson.categories = itemParser.RawItemParseCategories(response);
    responseJson.items = items;

    return responseJson;
  };

  return new Promise((resolve, reject) => {
    listItemsRequest
      .then((rawItemList: RawResponseList) => {
        // not classified response
        // do againt the call with category filters
        if (rawItemList.availableCategories && rawItemList.availableCategories.length) {
          // get category with most results
          const availableCategories: Category[] = rawItemList.availableCategories;
          const COMPARTOR_KEY: string = 'results';
          let category: Category = Utils.findHighestValue(availableCategories, COMPARTOR_KEY);
          const listItemsByCategory = itemsExternalService.listItems(like, category.id);

          listItemsByCategory
            .then((response: RawResponseList) => {
              resolve(prepareResponse(response));
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          // just one filter request
          resolve(prepareResponse(rawItemList));
        }
      })
      .catch((error) => reject(error));
  });
};
