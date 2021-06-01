const https = require('https');

import { environment } from '../environments/environment';
import { ErrorResponse } from '../shared/utils/error-response';
import { RawResponseList } from '../shared/interfaces/raw-response-list.interface';
import { Category } from '../shared/interfaces/category.interface';

export class ItemsExternalService {
  // Service entity name
  private ENTITY: string = 'Items';

  // External service URL

  // Error messages util
  private errorResponse: ErrorResponse = new ErrorResponse(this.ENTITY);

  constructor() {}

  // External service list items call method
  public listItems(
    like: string,
    categoryId: string = '',
    limit: number = 4
  ): Promise<RawResponseList> {
    return new Promise((resolve, reject) => {
      const CATEGORY_ID = 'category';
      let url = `${environment.API_URL}/${environment.MELI_ITEMS_URL}?limit=${limit}&q=${like}`;
      let data: string = '';

      if (categoryId !== '') {
        console.log(url);
        url += `&${CATEGORY_ID}=${categoryId}`;
        console.log(url);
      }

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
              const AVAILABLE_FILTERS = 'available_filters';
              let categories: any;

              const rawItemsList = JSON.parse(data);
              // Get the list of items
              const items: any[] = rawItemsList[RESULTS_KEY];
              // Get the list of categories
              const filters: any[] = rawItemsList[FILTERS_KEY];
              const category: any = filters.find((f) => f.id === CATEGORY_ID);
              const availableFilters: any[] = rawItemsList[AVAILABLE_FILTERS];
              if (category !== undefined) {
                categories = category.values;
              }
              const results: RawResponseList = {
                items,
                categories,
              };
              if (!filters.length) {
                // Caso especial
                // En caso de haber buscado una palabra sin clasificación,
                //  busco por la de mayor resultados, y realizo la búsqueda nuevamente.
                const availableCategories: any = availableFilters.find(
                  (ac) => ac.id === CATEGORY_ID
                );
                // Get category filter.
                results.availableCategories = availableCategories
                  ? availableCategories['values']
                  : undefined;
              }
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
