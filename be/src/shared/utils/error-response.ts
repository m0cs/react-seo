import { Error } from '../interfaces/error.interface';

// An http error json builder.
export class ErrorResponse {
  private entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }

  public notFoundError(): Error {
    return {
      error: `${this.entity}_not_found`,
      statusCode: 404,
    };
  }

  public badRequestError(message: string) {
    return {
      error: `${this.entity}_bad_request`,
      statusCode: 400,
      message: message,
    };
  }

  public badGatewayError(): Error {
    return {
      error: `${this.entity}_bad_gateway`,
      statusCode: 500,
    };
  }

  public unhandledError(): Error {
    return {
      error: `${this.entity}_unhandled`,
      statusCode: 500,
    };
  }
}
