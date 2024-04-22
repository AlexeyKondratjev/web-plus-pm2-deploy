import { HttpResponseStatusCodes } from '../utils/enums';

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.INTERNAL_SERVER_ERROR;
  }
}
