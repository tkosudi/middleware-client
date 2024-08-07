import { AbstractMethod } from '../../core/abstract-method.js'
import { ApiError } from '../../errors/api-error.js'
import { RequestError } from '../../errors/request-error.js'

export class SendProduct extends AbstractMethod {
  /**
   * Encaminha um produto para a API
   * @param {Object} product
   * @returns {Object}
   */
  async execute(product) {
    const endpoint = 'https://357vtrxigb.execute-api.us-east-1.amazonaws.com/prd/v1/product'
    const method = 'POST'

    const requiredFields = ['sku', 'name', 'description']
    for (const field of requiredFields) {
      if (!product[field]) {
        throw new RequestError(`Missing required field: ${field}`)
      }
    }

    try {
      const response = await this.client.call(endpoint, method, product)

      if (response.status === 201) {
        return response.data
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          throw new ApiError('Entity already exists', 409)
        } else if (error.response.status === 422) {
          throw new ApiError('Invalid input: ' + error.response.data.message, 422)
        }
      }
      throw error
    }
  }
}
