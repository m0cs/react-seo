const https = require('https');

import { environment } from '../environments/environment';
import { ErrorResponse } from '../shared/utils/error-response';

// Service entity name.
const ENTITY: string = 'Item';

// Error messages util
const errorResponse: ErrorResponse = new ErrorResponse(ENTITY);

export class ItemExternalService {
  constructor() {}

  // External service get item call method
  public getItemById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${environment.API_URL}/${environment.MELI_ITEM_URL}/${id}`;
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
              const json = JSON.parse(data);
              resolve(json);
              break;
            case 404:
              reject(errorResponse.notFoundError());
              break;
            default:
              reject(errorResponse.badGatewayError());
              break;
          }
        });
      };

      if (id === undefined) {
        reject(errorResponse.badRequestError('invalid_item_id'));
      }

      https.get(url, callback).end();
    });
  }

  // External service get item description call method
  public getItemDescriptionById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${environment.API_URL}/${environment.MELI_ITEM_URL}/${id}/${environment.MELIT_ITEM_DESC_URL}`;
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
              const json = JSON.parse(data);
              resolve(json);
              break;
            case 404:
              reject(errorResponse.notFoundError());
              break;
            default:
              reject(errorResponse.badGatewayError());
              break;
          }
        });
      };

      if (id === undefined) {
        reject(errorResponse.badRequestError('invalid_item_id'));
      }

      https.get(url, callback).end();
    });
  }
}
