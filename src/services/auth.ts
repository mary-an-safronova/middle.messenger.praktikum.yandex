/* eslint-disable no-console */
import { PATH, router } from '../utils/constants';
import AuthAPI from '../api/auth-api';
import store from '../core/store';
import { TSignInForm, TSignUpForm } from '../utils/types';
import * as messagesController from './messeges';

const authAPI = new AuthAPI();

export const getUser = async () => {
  try {
    const data = await authAPI.read();
    store.set('currentUser.data', data);
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (data: TSignInForm) => {
  try {
    await authAPI.signin(data);
    store.set('currentUser.data', data);
    router.go(PATH.messenger);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (data: TSignUpForm) => {
  try {
    await authAPI.create(data);
    router.go(PATH.messenger);
    store.set('currentUser.data', data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    await authAPI.logout();
    router.go(PATH.signIn);
    messagesController.closeAll();
  } catch (err) {
    console.log(err);
  }
};

// Функция для проверки авторизации
export const checkAuth = async () => {
  const userInState = store.getState().currentUser?.data; // Получаем данные пользователя из store
  if (userInState?.id === null) {
    router.go(PATH.signIn); // Неавторизованного юзера перенаправляем на signIn
    return false;
  }
  return true;
};
