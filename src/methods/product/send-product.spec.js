import { SendProduct } from "../product/send-product"
import { ApiClient } from "../client/api-client"
import axios from "axios"
import { RequestError } from "../../errors/request-error"

jest.mock('axios')

describe('SendProduct', () => {

  let client
  let sendProduct

  beforeEach(() => {
    client = new ApiClient({ token: 'any_token' })
    sendProduct = new SendProduct(client)

    client.call = jest.fn().mockResolvedValue({
      status: 201,
      data: { success: true }
    })
  })

  test('Should call SendProduct with correct values', async () => {
    const productData = {
      client_id: '66a157abe244d77781ba32cc',
      sku: 'd701748f0999',
      name: 'Produto teste',
      reference_id: 158641,
      ean: 484546544489,
      weight: 0.1,
      status: 'active',
      description: 'Produto teste com finalidade de definição de schema.',
      short_description: 'Produto teste com finalidade de definição de schema.',
      height: 0.2,
      width: 0.3,
      length: 0.1,
      additional_attributes: [
        {
          key: 'inmetro_code',
          label: 'Código do Inmetro',
          value: '6750/2014'
        },
        {
          key: 'color',
          label: 'Cor',
          value: 'preto'
        }
      ],
      image_list: [
        {
          url: 'https://www.teste.com.br/pasta/iphone.jpg',
          position: 1,
          label: 'Teste',
          main_image: true
        }
      ]
    }

    const response = await sendProduct.execute(productData)

    expect(response).toEqual({ success: true })
    expect(client.call).toHaveBeenCalledWith(
      'https://357vtrxigb.execute-api.us-east-1.amazonaws.com/prd/v1/product',
      'POST',
      productData
    )
  })

  test('Should throw error if required fields are missing', async () => {
    const productData = {
      client_id: '66a157abe244d77781ba32cc',
      reference_id: 158641,
      ean: 484546544489,
      weight: 0.1,
      status: 'active',
      short_description: 'Produto teste com finalidade de definição de schema.',
      height: 0.2,
      width: 0.3,
      length: 0.1,
      additional_attributes: [
        {
          key: 'inmetro_code',
          label: 'Código do Inmetro',
          value: '6750/2014'
        },
        {
          key: 'color',
          label: 'Cor',
          value: 'preto'
        }
      ],
      image_list: [
        {
          url: 'https://www.teste.com.br/pasta/iphone.jpg',
          position: 1,
          label: 'Teste',
          main_image: true
        }
      ]
    };

    await expect(sendProduct.execute(productData)).rejects.toThrow(RequestError);
    await expect(sendProduct.execute(productData)).rejects.toThrow('Missing required field: sku');
  })

})