/* eslint-disable @typescript-eslint/no-explicit-any */
import { TSignInForm, TSignUpForm, TUser } from '../utils/types';
import BaseAPI from './base-api';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async create(data: TSignUpForm): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  async signin(data: TSignInForm): Promise<any> {
    return this.http.post('/signin', data);
  }

  async read(): Promise<TUser | unknown> {
    return this.http.get('/user');
  }

  async logout() {
    return this.http.post('/logout');
  }
}
