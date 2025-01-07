import {
  TAddChatForm,
  TAddUserToChatData,
  TDeletedChat,
  TMessage,
  TUserWithRole,
} from '../utils/types/types';
import BaseAPI from './base-api';

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async create(data: TAddChatForm): Promise<{ id: number }> {
    return this.http.post('', data);
  }

  async read(): Promise<TMessage[]> {
    return this.http.get('');
  }

  async delete(data: { chatId?: number | null }): Promise<TDeletedChat> {
    return this.http.delete('', data);
  }

  async readChatUsers(chatId?: number | null): Promise<TUserWithRole> {
    return this.http.get(`/${chatId}/users`);
  }

  async addUser(data: TAddUserToChatData) {
    return this.http.put('/users', data);
  }

  async deleteUser(data: TAddUserToChatData) {
    return this.http.delete('/users', data);
  }
}
