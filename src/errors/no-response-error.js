import { ApiError } from './api-error.js';

export class NoResponseError extends ApiError {
  constructor(message = 'No response received from API') {
    super(message, 500);
    this.name = 'NoResponseError';
  }
}
