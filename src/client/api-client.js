import axios from "axios"
import { AbstractClient } from "../core/abstract-client"
import { ApiError } from "../errors/api-error"
import { UnauthorizedError } from "../errors/unauthorized-error"
import { NoResponseError } from "../errors/no-response-error"
import { RequestError } from "../errors/request-error"


export class ApiClient extends AbstractClient {
  /**
   * Intermediação para chamadas à API
   * 
   * @param {string} endpoint
   * @param {string} method
   * @param {string} data
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
        if (error.status === 401) {
          throw UnauthorizedError(error.response.message, error.response.status)
        }
        throw ApiError(error.response.message, error.response.status)
      }

      if (error.request) {
        throw NoResponseError()
      }

      throw new RequestError()
    }
  }
}