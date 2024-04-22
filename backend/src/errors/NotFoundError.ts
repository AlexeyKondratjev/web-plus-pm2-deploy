import { HttpResponseStatusCodes } from '../utils/enums';

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.NOT_FOUND;
  }
}
