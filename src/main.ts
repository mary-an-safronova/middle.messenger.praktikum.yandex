import './style.css';
import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core';
import * as Pages from './pages';
import { BlockConstructable } from './core/register-component';
import { PATH, router } from './utils/constants';

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
const onDomLoaded = () => {
  router
    .use(PATH.signIn, Pages.SignInPage)
    .use(PATH.signUp, Pages.SignUpPage)
    .use(PATH.settings, Pages.ProfilePage)
    .use(PATH.messenger, Pages.ChatPage)
    .use(PATH.badRequest, Pages.BadRequestPage)
    .use('*', Pages.BadRequestPage)
    .start();
};
// Инициализация после загрузки документа
document.addEventListener('DOMContentLoaded', onDomLoaded);
