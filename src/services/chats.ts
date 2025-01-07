/* eslint-disable no-console */
import ChatsAPI from '../api/chats-api';
import store from '../core/store';
import { TAddChatForm, TAddUserToChatData } from '../utils/types/types';

const chatsApi = new ChatsAPI();

export const createChat = async (data: TAddChatForm) => {
  try {
    const response = await chatsApi.create(data);
    window.location.reload();
    console.log('response.id in servisesCHAT createChat: ', response.id);
  } catch (err) {
    console.log(err);
  }
};

export const getChatList = async () => {
  try {
    const data = await chatsApi.read();
    store.set('chatList', data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteChat = async (data: { chatId?: number | null }) => {
  try {
    const response = await chatsApi.delete(data);
    window.location.reload();
    console.log('data in servisesCHATS deleteChatList: ', response);
  } catch (err) {
    console.log(err);
  }
};

export const getChatUsers = async (chatId?: number | null) => {
  try {
    const response = await chatsApi.readChatUsers(chatId);
    store.set('currentChat.chat_users', response);
  } catch (err) {
    console.log(err);
  }
};

export const addUserToChat = async (data: TAddUserToChatData) => {
  try {
    await chatsApi.addUser(data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserFromChat = async (data: TAddUserToChatData) => {
  try {
    await chatsApi.deleteUser(data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
