export class AbstractClient {
  /**
   * Utilizada para intermediar a comunicação com a api
   * @param {{}} credentials
   */

  constructor(credentials) {
    this.credentials = credentials
  }

  /**
   * @abstract
   */

  async call() {
    throw new Error('Please implement this')
  }
}

