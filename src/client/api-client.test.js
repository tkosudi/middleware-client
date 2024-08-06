import { jest } from '@jest/globals'
import { ApiClient } from './api-client'
import * as axios from 'axios'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { ApiError } from '../errors/api-error'

jest.mock('axios')

const credentials = { token: 'any_token' }
const client = new ApiClient(credentials)

const endpoint = 'any_url_endpoint'
const method = 'POST'
const data = { key: 'any_value' }

describe('ApiClient', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should call the API with correct values', async () => {
    const responseData = { success: true }
    axios.mockResolvedValue({ data: responseData })

    const result = await client.call(endpoint, method, data)

    expect(result).toEqual(responseData)
    expect(axios).toHaveBeenCalledWith({
      url: 'any_url_endpoint',
      method: 'POST',
      data: { key: 'any_value' },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credentials.token}`
      }
    })
  })

  test('Should return 401 if API returns unauthorized error', async () => {
    axios.mockRejectedValue({
      response: {
        status: 401,
        data: {
          error: 'Unauthorized'
        }
      }
    })

    await expect(client.call(endpoint, method, data)).rejects.toThrow(UnauthorizedError)
  })

  test('Should return 403 if API returns forbidden error', async () => {
    axios.mockRejectedValue({
      response: {
        status: 403,
        data: {
          error: 'Forbidden'
        }
      }
    })

    await expect(client.call(endpoint, method, data)).rejects.toThrow(ApiError)
  })

  test('Should return 404 if API returns not found error', async () => {
    axios.mockRejectedValue({
      response: {
        status: 404,
        data: {
          error: 'Not Found'
        }
      }
    });

    await expect(client.call(endpoint, method, data)).rejects.toThrow(ApiError);
  })

})




// test('Should handle API errors', async () => {
//   axios.mockRejectedValue({
//     response: {
//       status: 400,
//       data: { error: 'Bad Request' }
//     }
//   })

//   await expect(client.call(endpoint, method, data)).rejects.toThrow(ApiError)
// })