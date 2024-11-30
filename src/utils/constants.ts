import { TUser } from './types';
import * as Pages from '../pages';
import {
  iconRight,
  iconLeft,
  avatarIcon,
  searchIcon,
  arrowRight,
  avatar,
  photoVideoIcon,
  fileIcon,
  locationIcon,
  deleteIcon,
  addIcon,
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

export const fileMessageModalItems = [
  {
    icon: photoVideoIcon,
    text: 'Фото или Видео',
  },
  {
    icon: fileIcon,
    text: 'Файл',
  },
  {
    icon: locationIcon,
    text: 'Локация',
  },
];

export const menuModalItems = [
  {
    icon: addIcon,
    text: 'Добавить пользователя',
  },
  {
    icon: deleteIcon,
    text: 'Удалить пользователя',
  },
];
