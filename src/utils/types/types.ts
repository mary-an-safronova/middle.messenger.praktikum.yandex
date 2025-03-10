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

export type TChatUser = {
  id?: number;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  avatar?: string;
  role?: string;
}

export type TChat = {
  id?: number | null;
  title?: string;
  avatar?: string;
  avatar_image?: string | null;
  chat_users?: TUserWithRole[];
  unread_count?: number;
  created_by?: number;
  last_message?: TLastMessage;
};

export type TAddUserToChatData = {
  users: (number | null | undefined)[];
  chatId: number,
};

export type TChatModalItem = {
  icon: string;
  text: string;
};

export type TChatModalItems = TChatModalItem[];

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

export type TMessage = {
  chat_id?: number;
  time?: string;
  type?: string;
  user_id?: number;
  content?: string;
  file?: {
    id?: number;
    user_id?: number;
    path?: string;
    filename?: string;
    content_type?: string;
    content_size?: number;
    upload_date?: string;
  }
}

export type TCurrentChat = {
  chat?: TChat | null;
  chat_users?: TChatUser[] | null;
  chat_token: any;
  messages: TMessage[],
  avatar_image: string;
}

export type TCurrentUser = {
  data?: TUser;
  password: TUserPassword;
  avatar_image: string;
}
