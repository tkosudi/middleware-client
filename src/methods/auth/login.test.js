import axios from 'axios'
import { ApiClient } from '../client/api-client'
import { Login } from './login'

jest.mock('axios')

describe('Login Integration', () => {
  let client
  let login

  beforeEach(() => {
    client = new ApiClient({})
    login = new Login(client)
  })

  it('should successfully login and retrieve token', async () => {
    const credentials = { email: 'livecode@integra.do', password: 'issoehumteste' }

    axios.mockResolvedValue({
      data: { token: 'fake-jwt-token', version: '1.0' }
    })

    console.log('Credentials:', credentials)

    try {
      const response = await login.execute(credentials)

      console.log('Response:', response)

      expect(response).toHaveProperty('token')
      expect(typeof response.token).toBe('string')
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  })

})
