import axios from 'axios'
import { AbstractClient } from '../core/abstract-client.js'
import { ApiError } from '../errors/api-error.js'
import { UnauthorizedError } from '../errors/unauthorized-error.js'
import { NoResponseError } from '../errors/no-response-error.js'
import { RequestError } from '../errors/request-error.js'

export class ApiClient extends AbstractClient {
  /**
   * Intermediação para chamadas à API
   * @param {string} endpoint
   * @param {string} method
   * @param {Object} data
   */
  async call(endpoint, method, data) {
    try {
      const response = await axios({
        url: endpoint,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.credentials.token}`
        }
      })

      return response.data
    } catch (error) {
      this.handleErrors(error)
    }
  }

  handleErrors(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new UnauthorizedError('User or password incorrect')
        case 403:
          throw new ApiError('Accesss forbidden', 403)
        case 404:
          throw new ApiError('Not found', 404)
        case 500:
          throw new ApiError('Internal server error', 500)
        default:
          throw new ApiError(error.response.data.error || `API error with status code: ${error.response.status}`)
      }
    } else if (error.request) {
      throw new NoResponseError('No response received from API')
    } else {
      throw new RequestError(`Request error: ${error.message}`)
    }
  }
}
