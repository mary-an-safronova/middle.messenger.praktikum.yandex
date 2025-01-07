/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import HTTPTransport from '../core/HTTPTransport';

export default class BaseAPI {
  protected http: HTTPTransport;

  constructor(endPoint: string) {
    this.http = new HTTPTransport(endPoint);
  }

  create?(_data: unknown): Promise<unknown> {
    throw new Error('Not implemented');
  }

  read?() {
    throw new Error('Not implemented');
  }

  update?(_data: unknown) {
    throw new Error('Not implemented');
  }

  delete?(_data: unknown) {
    throw new Error('Not implemented');
  }
}
