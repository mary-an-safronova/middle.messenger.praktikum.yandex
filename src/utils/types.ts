import { pages } from './constants';

export type TUser = {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  login?: string;
  avatar?: string;
  email?: string;
};

export type TUserPassword = {
  oldPassword?: string;
  newPassword?: string;
  confirmation_password?: string;
};

export type TFile = {
  file?: string;
};

type TLastMessage = {
  user?: TUser;
  time?: string;
  content?: string;
};

export type TMessage = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message?: TLastMessage;
};

export type PageKey = keyof typeof pages;

export type TMessageModalItem = {
  icon: string;
  text: string;
};

export type TMessageModalItems = TMessageModalItem[];
