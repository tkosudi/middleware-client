import axios from "axios"
import { AbstractClient } from "../core/abstract-client"


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
    } catch (error){
      if (error.response) {
        throw new Error(`API error response status ${error.response.status} with this message: ${error.response.data.error}`)
      }

      if (error.request) {
        throw new Error("No response received from API")
      }

      throw new Error(`Request Error: ${error.message}`)
    }
  }
}