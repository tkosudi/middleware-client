import { UnauthorizedError } from "../errors/unauthorized-error"
import { ApiClient } from "./api-client"

const credentials = { token: '' }
const client = new ApiClient(credentials)

describe('ApiClient Integration Test - Login', () => {
  const endpoint = 'https://357vtrxigb.execute-api.us-east-1.amazonaws.com/prd/v1/auth/login'
  const method = 'POST'
  const data = {
    email: 'livecode@integra.do',
    password: 'issoehumteste'
  }

  test('Should login successfully and receive a token', async () => {
    const result = await client.call(endpoint, method, data)
    expect(result).toHaveProperty('token')
    expect(result).toHaveProperty('version')
    credentials.token = result.token
  })

  test('Should handle unauthorized error', async () => {
    const invalidData = {
      email: 'invalid@integra.do',
      password: 'wrongpassword'
    }
    await expect(client.call(endpoint, method, invalidData)).rejects.toThrow(UnauthorizedError)
  })
})