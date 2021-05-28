import express, { Request, Response } from 'express';
import * as ItemService from './item.service';
import { Error } from '../shared/interfaces/error.interface';
import { ErrorResponse } from '../shared/utils/error-response';
import { ResponseItem } from '../shared/interfaces/response-item.interface';

var cluster = require('cluster');

export const itemRouter = express.Router();

const ENTITY: string = 'Item';

itemRouter.get('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;
  const errorResponse: ErrorResponse = new ErrorResponse(ENTITY);

  ItemService.findItemById(id)
    .then((item: ResponseItem) => {
      return res.status(200).send(item);
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
