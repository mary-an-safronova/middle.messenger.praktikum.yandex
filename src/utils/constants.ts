/* eslint-disable no-useless-escape */
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
} from '.';
import { TInputError, TUser } from './types';

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

// Регулярные выражения для валидации
const regex = {
  latinAndCyrillic: /^[A-Za-zА-Яа-яЁё]+$/, // только латиница или кириллица, без пробелов и без цифр
  latinNumDashUnderscores: /^[A-Za-z0-9-_]+$/, // допускается латиница, цифры, дефис, и нижнее подчёркивание
  LatinCyrillicDashSpace: /^[A-Za-zА-Яа-яёЁ\s-]+$/, // Допускается латиница или кириллица, дефис и пробел
  firstUpperLetter: /^[A-ZА-Я]/, // первая буква должна быть заглавной
  upLetterAndNumber: /^(?=.*[A-Z])(?=.*\d).+$/, // обязательно хотя бы одна заглавная буква и цифра
  noSpecialCharOnlyDash: /^[A-Za-zА-Яа-яЁё-]+$/, // нет спецсимволов (допустим только дефис)
  onlyNumbers: /^\+?\d+$/, // состоит из цифр, может начинаться с плюса
  notOnlyNumbers: /^(?=.*[A-Za-z])[A-Za-z0-9]*$/, // Не может целиком состоять из цифр
  mailChars: /^[a-zA-Z0-9_-]+\@[a-zA-Z]+\.[a-zA-Z]+$/, // Допускается латиница, цифры, дефис, и нижнее подчёркивание. Должна быть @ и точка после, но перед точкой должны быть буквы
  notEmpty: /^.+$/, // не должно быть пустым
  min3max20: /^.{3,20}$/, // Должен содержать от 3 до 20 символов
  min8max40: /^.{8,40}$/, // Должен содержать от 8 до 40 символов
  min10max15: /^.{10,15}$/, // Должен содержать от 10 до 15 символов
};

// Регулярные выражения для валидации
export const fieldsRegex = {
  name: {
    alfabet: regex.latinAndCyrillic,
    firstLetter: regex.firstUpperLetter,
    noSpecialChar: regex.noSpecialCharOnlyDash,
  },
  login: {
    alfabet: regex.latinNumDashUnderscores,
    onlyNumbers: regex.notOnlyNumbers,
    minMax: regex.min3max20,
  },
  email: {
    mailChars: regex.mailChars,
  },
  password: {
    upLetterAndNumber: regex.upLetterAndNumber,
    minMax: regex.min8max40,
  },
  phone: {
    onlyNumbers: regex.onlyNumbers,
    minMax: regex.min10max15,
  },
  message: regex.notEmpty,
  display_name: {
    alfabet: regex.LatinCyrillicDashSpace,
    firstLetter: regex.firstUpperLetter, // Первая буква заглавная
  },
};

export const inputErrorProps: TInputError = {
  error: false,
  errorText: '',
};
