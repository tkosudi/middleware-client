import { AbstractMethod } from "../../core/abstract-method.js"

export class Login extends AbstractMethod {
  /**
   * Realiza o login na API
   * @param {Object} credentials
   * @param {Object}
   */

  async execute(credentials) {
    const endpoint = `${process.env.API_URL}/auth/login`
    const method = 'POST'

    return await this.client.call(endpoint, method, credentials)
  }
}