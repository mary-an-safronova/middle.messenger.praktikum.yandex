import './style.css';
import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core';
import { navigate } from './utils';
import { PageKey } from './utils/types';
import { BlockConstructable } from './core/register-component';

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
