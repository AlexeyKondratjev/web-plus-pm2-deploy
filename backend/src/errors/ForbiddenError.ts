import { HttpResponseStatusCodes } from '../utils/enums';

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.FORBIDDEN;
  }
}
