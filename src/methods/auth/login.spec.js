import axios from "axios"
import { ApiClient } from "../client/api-client"
import { Login } from "./login"

jest.mock('axios')

describe('Login', () => {
  let client
  let login

  beforeEach(() => {
    client = new ApiClient({})
    login = new Login(client)
  })


  test('Should successfully login', async () => {
    const credentials = { email: 'any_email', password: 'any_password' };
    const token = 'fake-jwt-token';

    axios.mockResolvedValue({
      data: { token }
    });

    const response = await login.execute(credentials);
    expect(response.token).toBe(token);
  })
})