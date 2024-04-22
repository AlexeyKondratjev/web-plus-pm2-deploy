import { HttpResponseStatusCodes } from '../utils/enums';

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.AUTH_ERROR;
  }
}
