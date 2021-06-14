import { Item } from '../shared/interfaces/item.interface';
import { ItemParser } from '../shared/utils/item-parser';
import { ResponseItem } from '../shared/interfaces/response-item.interface';
import { ItemExternalService } from './item-external.service';

// Item parser util
const itemParser = ItemParser;

// Item list service
export const findItemById = (id: string): Promise<ResponseItem> => {
  const itemExternalService: ItemExternalService = new ItemExternalService();

  // Item external service call
  const rawItemRequest: Promise<any> = itemExternalService.getItemById(id);
  const rawItemDescriptionRequest: Promise<any> = itemExternalService.getItemDescriptionById(id);

  return new Promise((resolve, reject) => {
    Promise.all([rawItemRequest, rawItemDescriptionRequest])
      .then((response: [any, any]) => {
        const responseItem: ResponseItem = {
          author: {},
          item: {},
        };

        const rawItem: any = response[0];
        const rawItemDescription: any = response[1];

        const item: Item = itemParser.RawItemParse(rawItem, rawItemDescription);

        responseItem.item = item;

        resolve(responseItem);
      })
      .catch((error) => reject(error));
  });
};
