/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable quote-props */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

import { baseURL, PATH, router } from '../utils/constants';
import queryStringify from './utils/query-stringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: METHODS;
  data?: any;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
};

type HTTPMethod = <Response>(url: string, data?: { [x: string]: any }) => Promise<Response>

export default class HTTPTransport {
  static API_URL = baseURL;

  protected endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = `${HTTPTransport.API_URL}${endPoint}`;
  }

  public get: HTTPMethod = (url, data) => {
    let newPath = this.endPoint + url;
    if (data) newPath += queryStringify(data);
    return this.request(newPath, { method: METHODS.GET });
  };

  public post: HTTPMethod = (url, data) => (
    this.request(this.endPoint + url, { method: METHODS.POST, data })
  );

  public put: HTTPMethod = (url, data) => (
    this.request(this.endPoint + url, { method: METHODS.PUT, data })
  );

  public delete: HTTPMethod = (url, data) => (
    this.request(this.endPoint + url, { method: METHODS.DELETE, data })
  );

  private async request<Response>(
    url: string,
    options: Options = { method: METHODS.GET },
  ): Promise<Response> {
    const {
      method,
      data,
      headers = {},
      withCredentials = true,
      responseType = 'json',
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else if (xhr.status === 401) {
            router.go(PATH.signIn);
            reject(xhr.response);
          } else if (xhr.status === 500) {
            router.go(PATH.internalServer);
            reject(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        try {
          if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
          } else {
            xhr.send();
          }
        } catch (error: any) {
          reject(new Error(`Ошибка при сериализации данных: ${error.message}`));
        }
      }
    });
  }
}
