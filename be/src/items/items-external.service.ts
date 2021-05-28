const https = require('https');

import { environment } from '../environments/environment';
import { ErrorResponse } from '../shared/utils/error-response';

export class ItemsExternalService {
  // Service entity name
  private ENTITY: string = 'Items';

  // External service URL
  private ITEMS_URL: string = 'sites/MLA/search';

  // Error messages util
  private errorResponse: ErrorResponse = new ErrorResponse(this.ENTITY);

  constructor() {}

  // External service list items call method
  public listItems(like: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${environment.API_URL}/${this.ITEMS_URL}?q=${like}`;
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
              const rawItemsList = JSON.parse(data);
              const results: any[] = rawItemsList['results'];
              // Limit results # 4
              const resultsLength = results.length;
              // Get random results portion.
              const start =
                resultsLength > 3 ? Math.floor(Math.random() * results.length) - 4 : resultsLength;
              const reducedResults: any[] = results.slice(start, start + 4);

              resolve(reducedResults);
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

      https.get(url, callback).end();
    });
  }
}
