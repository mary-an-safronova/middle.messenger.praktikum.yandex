/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css';
import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core';
import * as Pages from './pages';
import { BlockConstructable } from './core/register-component';
import { PATH, router } from './utils/constants';
import * as authControllers from './services/auth';
import * as chatsControllers from './services/chats';
import * as usersControllers from './services/user';

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
  if (typeof template === 'function') {
    registerComponent(template as BlockConstructable<typeof template>);
    return;
  }
  Handlebars.registerPartial(name, template);
});

// Навигация по страницам
const onDomLoaded = async () => {
  await authControllers.getUser(); // Получаем данные юзера

  const auth = await authControllers.checkAuth();

  if (auth) { // Если юзер авторизован
    await usersControllers.getCurrentUserAvatar(); // Получаем корректный аватар юзера
    await chatsControllers.getChatList(); // Загружаем чаты

    router
      .use(PATH.settings, Pages.ProfilePage as any) // Настройки профиля
      .use(PATH.messenger, Pages.ChatPage as any) // Чат
      .use(PATH.internalServer, Pages.InternalServerErrorPage) // Ошибка сервера
      .use('*', Pages.BadRequestPage) // Если роут неизвестен, перенаправляем на BadRequestPage
      .start();
  } else { // Если юзер неавторизован
    router
      .use(PATH.signIn, Pages.SignInPage as any) // Авторизация
      .use(PATH.signUp, Pages.SignUpPage as any) // Регистрация
      .start();
  }
};

// Инициализация после загрузки документа
document.addEventListener('DOMContentLoaded', onDomLoaded);
