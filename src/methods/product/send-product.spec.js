import { SendProduct } from "../product/send-product"
import { ApiClient } from "../client/api-client"
import * as axios from "axios"

jest.mock('axios')

describe('SendProduct', () => {

  let client
  let sendProduct

  beforeEach(() => {
    client = new ApiClient({})
    sendProduct = new SendProduct(client)
  })

  test('Should successfully send a product', async () => {
    const product = {
      sku: 'd701748f0999',
      name: 'Produto teste',
      description: 'Produto teste com finalidade de definição de schema.',
      additional_attributes: [
        { key: 'color', value: 'preto' }
      ],
      image_list: [
        {
          url: 'https://example.com/product.jpg',
          position: 1,
          main_image: true
        }
      ]
    };

    axios.mockResolvedValue({
      data: { success: true }
    });

    const response = await sendProduct.execute(product);
    expect(response.success).toBe(true);
  })
})