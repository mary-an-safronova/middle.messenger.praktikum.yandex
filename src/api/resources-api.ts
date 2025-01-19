/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseAPI from './base-api';

export default class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  async getResource(path?: string): Promise<any> {
    return this.http.get(`/${path}`);
  }
}
