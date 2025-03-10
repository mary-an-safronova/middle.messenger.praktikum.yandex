/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import ChatsAPI from '../api/chats-api';
import store from '../core/store';
import { baseURL } from '../utils/constants';
import { TAddChatForm, TAddUserToChatData, TAvatarForm } from '../utils/types/types';
import { getResourceByPath } from './resource';

const chatsApi = new ChatsAPI();

export const getChatList = async () => {
  try {
    const data = await chatsApi.read();
    const dataWithCurrentAvatar = data?.map((chat) => {
      chat.avatar_image = `${baseURL}/resources${chat.avatar}`;
      if (chat.avatar_image === `${baseURL}/resources${null}`) {
        chat.avatar_image = '';
        return chat;
      }

      return chat;
    });

    store.set('chatList', dataWithCurrentAvatar);
  } catch (err) {
    console.log(err);
  }
};

export const createChat = async (data: TAddChatForm) => {
  try {
    const response = await chatsApi.create(data);
    console.log('response.id in servisesCHAT createChat: ', response.id);
    await getChatList(); // Обновляем список чатов
  } catch (err) {
    console.log(err);
  }
};

export const deleteChat = async (data: { chatId?: number | null }) => {
  try {
    const response = await chatsApi.delete(data);
    await getChatList(); // Обновляем список чатов
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
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserFromChat = async (data: TAddUserToChatData) => {
  try {
    await chatsApi.deleteUser(data);
  } catch (err) {
    console.log(err);
  }
};

export const getChatToken = async (chatId?: number | null) => {
  try {
    const response = await chatsApi.getToken(chatId);
    store.set('currentChat.chat_token', response.token);
  } catch (err) {
    console.log(err);
  }
};

export const addChatAvatar = async (chatAvatar: TAvatarForm, chatId?: number | null) => {
  try {
    const formData = new FormData();
    if (chatAvatar.file) {
      formData.append('avatar', chatAvatar.file);
      formData.append('chatId', String(chatId));
    }
    const response = await chatsApi.addAvatar(formData);
    store.set('currentChat.chat', response);
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentChatAvatar = async () => {
  try {
    const avatarPath = store.getState().currentChat?.chat?.avatar; // Состояние данных юзера
    if (avatarPath === null) {
      store.set('currentChat.avatar_image', '');
      return;
    }
    await getResourceByPath(avatarPath);
    store.set('currentChat.avatar_image', `${baseURL}/resources${avatarPath}`);
  } catch (err) {
    console.log(err);
  }
};
