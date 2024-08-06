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
      if (error.response) {
        if (error.response.status === 401) {
          throw new UnauthorizedError(error.response.data.error)
        }

        throw new ApiError(error.response.data.error, error.response.status)
      }

      if (error.request) {
        throw new NoResponseError()
      }

      throw new RequestError(error.message)
    }
  }
}
