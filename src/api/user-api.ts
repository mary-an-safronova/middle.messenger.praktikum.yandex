/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TLogin,
  TUser,
  TUserPassword,
  TUserWithoutIdAvatar,
} from '../utils/types/types';
import BaseAPI from './base-api';

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  async update(data: TUserWithoutIdAvatar): Promise<TUser> {
    return this.http.put('/profile', data);
  }

  async updatePassword(data: TUserPassword): Promise<any> {
    return this.http.put('/password', data);
  }

  async updateAvatar(data: FormData): Promise<TUser> {
    return this.http.put('/profile/avatar', data);
  }

  async searchUser(data: TLogin): Promise<TUser[]> {
    return this.http.post('/search', data);
  }
}
