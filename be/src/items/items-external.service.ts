const https = require('https');

import { environment } from '../environments/environment';
import { ErrorResponse } from '../shared/utils/error-response';
import { RawResponseList } from '../shared/interfaces/raw-response-list.interface';

export class ItemsExternalService {
  // Service entity name
  private ENTITY: string = 'Items';

  // External service URL

  // Error messages util
  private errorResponse: ErrorResponse = new ErrorResponse(this.ENTITY);

  constructor() {}

  // External service list items call method
  public listItems(like: string, limit: number = 4): Promise<RawResponseList> {
    return new Promise((resolve, reject) => {
      const url = `${environment.API_URL}/${environment.MELI_ITEMS_URL}?limit=${limit}&q=${like}`;
      let data: string = '';

      const callback = (response: any) => {
        response.on('data', (chunk: string) => {
          data += chunk;
        });

        response.on('error', (error: any) => {
          reject(error.status);
        });

        response.on('end', () => {
          switch (response.statusCode) {
            case 200:
              const RESULTS_KEY = 'results';
              const FILTERS_KEY = 'filters';
              const CATEGORY_ID = 'category';
              let categories: any;

              const rawItemsList = JSON.parse(data);
              // Get the list of items
              const items: any[] = rawItemsList[RESULTS_KEY];
              // Get the list of categoires
              const filters: any[] = rawItemsList[FILTERS_KEY];
              const category: any = filters.find((f) => f.id === CATEGORY_ID);

              if (category !== undefined) {
                categories = category.values;
              }
              const results: RawResponseList = {
                items,
                categories,
              };
              resolve(results);
              break;
            case 404:
              reject(this.errorResponse.notFoundError());
              break;
            default:
              reject(this.errorResponse.badGatewayError());
              break;
          }
        });
      };

      if (like === undefined) {
        reject(this.errorResponse.badRequestError('invalid_like'));
      }

      https.get(url, { forever: true }, callback).end();
    });
  }
}
