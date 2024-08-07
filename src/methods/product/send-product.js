import { AbstractMethod } from '../../core/abstract-method'

export class SendProduct extends AbstractMethod {
  /**
   * Encaminha produtos para a API
   * @param {Object} product
   * @returns {Object}
   */

  async execute(product) {
    const endpoint = 'https://357vtrxigb.execute-api.us-east-1.amazonaws.com/prd/v1/product'
    const method = 'POST'

    const requiredFields = ['sku', 'name', 'description']

    for (const field of requiredFields) {
      if (!product[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return await this.client.call(endpoint, method, product);
  }
}