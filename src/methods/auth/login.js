import { AbstractMethod } from "../../core/abstract-method";

export class Login extends AbstractMethod {
  /**
   * Realiza o login na API
   * @param {Object} credentials
   * @param {Object}
   */

  async execute(credentials) {
    const endpoint = 'https://357vtrxigb.execute-api.us-east-1.amazonaws.com/prd/v1/auth/login'
    const method = 'POST'

    return await this.client.call(endpoint, method, credentials)
  }
}