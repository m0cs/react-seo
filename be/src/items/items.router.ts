import express, { Request, Response } from 'express';
import { ErrorResponse } from '../shared/utils/error-response';
import * as ItemsService from './items.service';
import { Error } from '../shared/interfaces/error.interface';
import { ResponseItems } from '../shared/interfaces/response-items.interface';

export const itemsRouter = express.Router();

const ENTITY: string = 'Items';

itemsRouter.get('/', (req: Request, res: Response) => {
  const like: string = req.query.q as string;
  const errorResponse: ErrorResponse = new ErrorResponse(ENTITY);

  ItemsService.list(like)
    .then((items: ResponseItems) => {
      return res.status(200).send(items);
    })
    .catch((error: Error) => {
      if (error.statusCode) {
        return res.status(error.statusCode).send(error);
      } else {
        const unhandledError: Error = errorResponse.unhandledError();
        return res.status(unhandledError.statusCode).send(unhandledError);
      }
    });
});
