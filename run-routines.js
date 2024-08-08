import { readFile } from 'fs/promises'
import { ApiClient, SendProduct, Login } from './index.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new ApiClient({ token: null })

async function loadAndExecuteRoutines() {
  try {
    const data = await readFile('./routines.json', 'utf8')

    const configString = data.replace(/\$\{(\w+)\}/g, (_, v) => process.env[v])
    const config = JSON.parse(configString)

    async function executeConfig(config) {
      for (const step of config) {
        if (step[0] === 'define') {
          global[step[1].var] = step[1].value
        } else if (step[0] === 'call') {
          const service = step[1].service.split(':')[1]
          const method = step[1].method
          const parameters = step[1].parameters.map(param => global[param.substring(1)] || param)


          let methodInstance
          if (service === 'client' && method === 'Login') {
            methodInstance = new Login(client)
            const response = await methodInstance.execute(...parameters)
            client.setToken(response.token)
          }
        } else if (step[0] === 'each') {
          const items = global[step[1].generator[1].var]
          for (const item of items) {
            for (const routine of step[1].routine) {
              if (routine[0] === 'call') {
                const service = routine[1].service.split(':')[1]
                const method = routine[1].method
                const parameters = routine[1].parameters.map(param => param.startsWith('$') ? item : param)

                let methodInstance
                if (service === 'client' && method === 'SendProduct') {
                  methodInstance = new SendProduct(client)
                }

                await methodInstance.execute(...parameters)
              }
            }
          }
        }
      }
    }

    await executeConfig(config)
    console.log('Produtos enviados com sucesso')
  } catch (error) {
    console.error('Erro ao processar rotinas:', error.message)
  }
}

loadAndExecuteRoutines()
