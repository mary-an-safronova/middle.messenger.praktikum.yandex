import { pages } from '../constants';

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

export type TLastMessage = {
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

export type TSignInForm = {
  login: string;
  password: string;
};

export type TSignUpForm = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  confirmation_password: string;
};

export type TAvatarForm = { file: string };

export type TChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmation_password: string;
};

export type TChangeUserForm = TUser;

type TLogin = { login: string };

export type TAddUserForm = TLogin;
export type TDeleteUserForm = TLogin;
export type TMessageForm = { message: string };

export type TInputError = {
  error: boolean;
  errorText: string
}
