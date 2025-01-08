/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from '../../core/block';

export type TUser = {
  id?: number | null;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  login?: string;
  avatar?: string;
  email?: string;
};

type TUserWithoutPhoneEmail = Omit<TUser, 'phone' | 'email'>;
export type TUserWithRole = TUserWithoutPhoneEmail & { role?: string };

export type TUserWithoutIdAvatar = Omit<TUser, 'id' | 'avatar'>;

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
  id?: number | null;
  title?: string;
  avatar?: string;
  unread_count?: number;
  created_by?: number;
  last_message?: TLastMessage;
};

export type TChatUser = {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  avatar?: string;
  role?: string;
}

export type TAddUserToChatData = {
  users: (number | null | undefined)[];
  chatId: number,
};

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
  confirmation_password?: string;
};

export type TAvatarForm = { file?: string; };

export type TLogin = { login: string };

export type TAddUserForm = TLogin;
export type TDeleteUserForm = TLogin;
export type TMessageForm = { message: string };

export type TAddChatForm = { title: string };

export type TDeletedChat = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  }
}

export type TInputError = {
  error: boolean;
  errorText: string
}

export type BlockConstructable<P = any> = {
  new(props: P): Block
}
