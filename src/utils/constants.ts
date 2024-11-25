import { TUser } from './types';
import * as Pages from '../pages';
import {
  iconRight,
  iconLeft,
  avatarIcon,
  searchIcon,
  arrowRight,
  avatar,
} from '../assets';
import {
  messageContactsData,
  userProfileInfoData,
} from './fakeData';

export const userProfileInfoNames: TUser = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Имя в чате',
  phone: 'Телефон',
};

export const pages = {
  signInPage: [Pages.SignInPage],
  signUpPage: [Pages.SignUpPage],
  navigatePage: [Pages.NavigatePage],
  addUserModal: [Pages.AddUserModal],
  deleteUserModal: [Pages.DeleteUserModal],
  internalServerErrorPage: [Pages.InternalServerErrorPage],
  badRequestPage: [Pages.BadRequestPage],
  profilePage: [
    Pages.ProfilePage,
    {
      iconLeft,
      iconRight,
      avatarIcon,
      userProfileInfoNames,
      userProfileInfoData,
    },
  ],
  chatPage: [
    Pages.ChatPage,
    {
      searchIcon, arrowRight, avatar, messageContactsData,
    },
  ],
};
