/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
};

// Тип Omit удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const { data } = options;
    const queryString = this.createQueryString(data);
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return this.request(fullUrl, { ...options, method: METHODS.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  private request(url: string, options: Options): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = 'json';

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network Error'));
      xhr.ontimeout = () => reject(new Error('Request timed out'));

      if (method === METHODS.GET && !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json'); // Устанавливаем тип контента для POST и PUT
        xhr.send(JSON.stringify(data));
      }
    });
  }

  private createQueryString(data: Record<string, unknown>): string {
    if (!data) {
      return '';
    }
    return Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return ''; // Возвращаем пустую строку для неподходящих типов
      })
      .filter(Boolean) // Убираем пустые строки
      .join('&');
  }
}
