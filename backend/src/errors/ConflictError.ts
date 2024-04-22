import { HttpResponseStatusCodes } from '../utils/enums';

export class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.CONFLICT;
  }
}
