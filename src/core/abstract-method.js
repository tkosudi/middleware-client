export class AbstractMethod {
  /**
   * classe especializada em executar chamadas de endpoints especificos na api
   * @param {AbstractionClient} client 
   */

  constructor (client) {
    this.client = client
  }

  /**
   * @abstract
   */
  async execute() {
    throw new Error("Please implement this")
  }
}