import { ApiError } from './api-error.js';

export class RequestError extends ApiError {
  constructor(message) {
    super(message, 400);
    this.name = 'RequestError';
  }
}
