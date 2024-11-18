import './style.css';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import {
  iconRight,
  iconLeft,
  defaultAvatarIcon,
  searchIcon,
  arrowRight,
  avatar,
} from './assets';
import {
  messageContactsData,
  userProfileInfoData,
  userProfileInfoNames,
  userProfilePasswordData,
} from './utils/constants';

// Регистрация хелперов
Handlebars.registerHelper({
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  not: (a) => !a,
  eq: (a, b) => a === b,
  more: (a, b) => a > b,
});

// Регистрация компонентов
Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

const pages = {
  signInPage: [Pages.SignInPage],
  signUpPage: [Pages.SignUpPage],
  navigatePage: [Pages.NavigatePage],
  addUserModal: [Pages.AddUserModal],
  deleteUserModal: [Pages.DeleteUserModal],
  fileUploadModal: [Pages.FileUploadModal],
  internalServerErrorPage: [Pages.InternalServerErrorPage],
  badRequestPage: [Pages.BadRequestPage],
  profilePage: [
    Pages.ProfilePage,
    {
      iconLeft,
      iconRight,
      defaultAvatarIcon,
      userProfileInfoNames,
      userProfileInfoData,
    },
  ],
  changedPasswordPage: [
    Pages.ChangedPasswordPage,
    {
      iconLeft, iconRight, defaultAvatarIcon, userProfilePasswordData,
    },
  ],
  changePasswordModal: [Pages.ChangePasswordModal],
  changedUserInfoPage: [
    Pages.ChangedUserInfoPage,
    {
      iconLeft,
      iconRight,
      defaultAvatarIcon,
      userProfileInfoNames,
      userProfileInfoData,
    },
  ],
  changeUserInfoModal: [Pages.ChangeUserInfoModal],
  chatPage: [
    Pages.ChatPage,
    {
      searchIcon, arrowRight, avatar, messageContactsData,
    },
  ],
};

type PageKey = keyof typeof pages;

// Навигация по страницам
function navigate(page: PageKey) {
  const [source, context] = pages[page];
  const root = document.querySelector<HTMLDivElement>('#app');

  const temlpatingFunction = Handlebars.compile(source);
  root!.innerHTML = temlpatingFunction(context);

  // Сохраняем состояние в историю
  history.pushState({ page }, '', `#${page}`);
}

// Обработчик события для 'popstate'
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    navigate(event.state.page);
  } else {
    // Возврат на страницу навигации
    navigate('navigatePage');
  }
});

// Инициализация после загрузки документа
document.addEventListener('DOMContentLoaded', () => navigate('navigatePage'));

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
  if (page) {
    navigate(page as PageKey);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
