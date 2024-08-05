import { jest } from '@jest/globals'
import { ApiClient } from './api-client'
import * as axios from 'axios'

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
    const responseData = { success: true };
    axios.mockResolvedValue({ data: responseData });

    const result = await client.call(endpoint, method, data);

    expect(result).toEqual(responseData);
    expect(axios).toHaveBeenCalledWith({
      url: 'any_url_endpoint',
      method: 'POST',
      data: { key: 'any_value' },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credentials.token}`
      }
    });
  });
});


