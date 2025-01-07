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
import store from './core/store';

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

// Функция для проверки авторизации
const checkAuth = async () => {
  const userInState = store.getState().currentUser?.data; // Получаем данные пользователя из store
  if (userInState?.id === null) {
    router.go(PATH.signIn); // Неавторизованного юзера перенаправляем на signIn
    return false;
  }
  return true;
};

// Навигация по страницам
const onDomLoaded = async () => {
  await authControllers.getUser(); // Получаем данные юзера

  const auth = await checkAuth();

  if (auth) { // Если юзер авторизован
    await usersControllers.getCurrentUserAvatar(); // Получаем корректный аватар юзера
    await chatsControllers.getChatList(); // Загружаем чаты

    router
      .use(PATH.settings, Pages.ProfilePage) // Настройки профиля
      .use(PATH.messenger, Pages.ChatPage) // Чат
      .use(PATH.internalServer, Pages.InternalServerErrorPage) // Ошибка сервера
      .use('*', Pages.BadRequestPage) // Если роут неизвестен, перенаправляем на BadRequestPage
      .start();
  } else { // Если юзер неавторизован
    router
      .use(PATH.signIn, Pages.SignInPage) // Авторизация
      .use(PATH.signUp, Pages.SignUpPage) // Регистрация
      .start();
  }
};

// Инициализация после загрузки документа
document.addEventListener('DOMContentLoaded', onDomLoaded);
