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
  public listItems(like: string, limit: number = 4): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${environment.API_URL}/${this.ITEMS_URL}?limit=${limit}&q=${like}`;
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
