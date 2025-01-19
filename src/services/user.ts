/* eslint-disable no-console */
import ResourcesAPI from '../api/resources-api';
import UserAPI from '../api/user-api';
import store from '../core/store';
import { baseURL } from '../utils/constants';
import {
  TAvatarForm, TLogin, TUserPassword, TUserWithoutIdAvatar,
} from '../utils/types/types';

const userAPI = new UserAPI();
const resourcesAPI = new ResourcesAPI();

export const changeUserData = async (data: TUserWithoutIdAvatar) => {
  try {
    await userAPI.update(data);
    store.set('currentUser.data', data);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserPassword = async (data: TUserPassword) => {
  try {
    await userAPI.updatePassword(data);
    store.set('currentUser.password', data);
  } catch (err) {
    console.log(err);
  }
};

export const changeUserAvatar = async (data: TAvatarForm) => {
  try {
    const formData = new FormData();
    if (data.file) {
      formData.append('avatar', data.file);
    }
    const response = await userAPI.updateAvatar(formData);
    store.set('currentUser.data.avatar', response.avatar);
  } catch (err) {
    console.log(err);
  }
};

export const getResourceByPath = async (path?: string) => {
  try {
    await resourcesAPI.getResource(path);
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUserAvatar = async () => {
  try {
    const avatarPath = store.getState().currentUser?.data?.avatar; // Состояние данных юзера
    await getResourceByPath(avatarPath);
    store.set('currentUser.avatar_image', `${baseURL}/resources${avatarPath}`);
  } catch (err) {
    console.log(err);
  }
};

export const searchUserByLogin = async (data: TLogin) => {
  try {
    const response = await userAPI.searchUser(data);
    store.set('foundUsers', response);
  } catch (err) {
    console.log(err);
  }
};
