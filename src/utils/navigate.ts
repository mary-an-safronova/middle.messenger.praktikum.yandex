/* eslint-disable no-console */
/* eslint-disable new-cap */
import Handlebars from 'handlebars';
import { renderDOM } from '../core';
import { pages } from './constants';
import { PageKey } from './types';

// Навигация по страницам
export default function navigate(page: PageKey) {
  const rootId = '#app';
  const [source, context] = pages[page];
  if (typeof source === 'function') {
    renderDOM(rootId, new source({}));
    return;
  }
  const root = document.querySelector<HTMLDivElement>(rootId);

  const temlpatingFunction = Handlebars.compile(source);

  if (root) {
    root.innerHTML = temlpatingFunction(context);
  } else {
    console.error(`Element with ID "${rootId}" not found`);
  }

  // Сохраняем состояние в историю
  history.pushState({ page }, '', `#${page}`);
}
