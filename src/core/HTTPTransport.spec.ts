/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import * as sinon from 'sinon';
import HTTPTransport from './HTTPTransport';
import { baseURL, PATH, router } from '../utils/constants';
import queryStringify from './utils/query-stringify';

describe('HTTPTransport', () => {
  const endpoint = '/test';
  let httpTransport: HTTPTransport;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    httpTransport = new HTTPTransport(endpoint);
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    (global as any).XMLHttpRequest = xhr;
    xhr.onCreate = (req) => {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
    sinon.restore();
  });

  it('Должен корректно инициализироваться с конечной точкой', () => {
    expect(httpTransport.endPoint).to.equal(baseURL + endpoint);
  });

  it('Должен выполнять GET запрос', (done) => {
    httpTransport.get('/get').then(() => {
      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('GET');
      done();
    });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"success": true}');
  });

  it('GET запрос должен содержать правильный URL и метод', (done) => {
    const url = '/get';
    const data = { param1: 'value1', param2: 'value2' };
    httpTransport.get(url, data).then(() => {
      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('GET');
      expect(requests[0].url).to.equal(baseURL + endpoint + url + queryStringify(data));
      done();
    });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"success": true}');
  });

  it('POST запрос должен содержать правильный URL, данные и метод', (done) => {
    const url = '/post';
    const data = { key: 'value' };
    httpTransport.post(url, data).then(() => {
      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('POST');
      expect(requests[0].url).to.equal(baseURL + endpoint + url);
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));
      done();
    });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"success": true}');
  });

  it('PUT запрос должен содержать правильный URL, данные и метод', (done) => {
    const url = '/put';
    const data = { key: 'value' };
    httpTransport.put(url, data).then(() => {
      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('PUT');
      expect(requests[0].url).to.equal(baseURL + endpoint + url);
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));
      done();
    });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"success": true}');
  });

  it('DELETE запрос должен содержать правильный URL и метод', (done) => {
    const url = '/delete';
    const data = { key: 'value' };
    httpTransport.delete(url, data).then(() => {
      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('DELETE');
      expect(requests[0].url).to.equal(baseURL + endpoint + url);
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));
      done();
    });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"success": true}');
  });

  it('Должен обрабатывать ошибки 401', () => {
    const routerGoSpy = sinon.spy(router, 'go');
    xhr.onCreate = (req) => {
      requests.push(req);
      req.respond(401, { 'Content-Type': 'application/json' }, '{"error": "Unauthorized"}');
    };

    httpTransport.get('/get').catch(() => {
      expect(routerGoSpy.calledWith(PATH.signIn)).to.be.true;
    });
  });

  it('Должен обрабатывать ошибки 500', () => {
    const routerGoSpy = sinon.spy(router, 'go');
    xhr.onCreate = (req) => {
      requests.push(req);
      req.respond(500, { 'Content-Type': 'application/json' }, '{"error": "Internal Server Error"}');
    };

    httpTransport.get('/get').catch(() => {
      expect(routerGoSpy.calledWith(PATH.internalServer)).to.be.true;
    });
  });
});
